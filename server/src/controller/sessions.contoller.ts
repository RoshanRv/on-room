import { CookieOptions, Request, Response } from "express"
import { createSessionSchemaType } from "@schema/sessions.schema"
import { findUserByEmail, findUserById } from "@service/users.services"
import { compareSync } from "bcryptjs"
import { createSession, findSessionById } from "@service/sessions.services"
import { signToken, verifyToken } from "@utils/jwt"
import { omit } from "lodash"
import config from "config"

export const accessTokenOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: config.get("sameSite"),
    maxAge: 900000,
}

const refreshTokenOptions: CookieOptions = {
    ...accessTokenOptions,
    maxAge: 3.154e10,
}

export const createSessionHandler = async (
    req: Request<{}, {}, createSessionSchemaType["body"]>,
    res: Response
) => {
    try {
        const { body } = req
        const user = await findUserByEmail(body.email)
        if (!user) {
            return res.status(400).send("User Not Registered")
        }

        if (user && user.role !== body.role)
            return res.status(400).send("User Not Registered For This Role")

        const isValid = compareSync(body.password, user.password)

        if (!isValid) return res.status(401).send("Incorect Credentials")

        const session = await createSession(user.id)

        const payload = omit(user, ["password"])

        const accessToken = signToken(
            { ...payload, sessionId: session.id },
            "access"
        )
        const refreshToken = signToken(
            { ...payload, sessionId: session.id },
            "refresh"
        )

        res.cookie("accessToken", accessToken, accessTokenOptions)
        res.cookie("refreshToken", refreshToken, refreshTokenOptions)

        return res.status(201).send(accessToken)
    } catch (e: any) {
        console.log(e)
        return res.status(400).send(e.message)
    }
}

export const getCurrentUserHandler = async (req: Request, res: Response) => {
    const { user } = res.locals

    return res.send(user)
}

export const generateAccessToken = async (refreshToken: string) => {
    try {
        const { decoded, expired } = verifyToken(refreshToken, "refresh")

        if (!decoded || expired) throw new Error("Invalid Refresh Token")

        const user = await findUserById(decoded.id)

        if (!user) throw new Error("User not found")

        const session = await findSessionById(decoded.sessionId)

        if (!session?.valid || !session) throw new Error("Session ended")

        const payload = omit({ ...user, sessionId: session.id }, ["password"])

        const newAccessToken = signToken(payload, "access")

        return { newAccessToken }
    } catch (e) {
        console.log(e)
        return { newAccessToken: null }
    }
}
