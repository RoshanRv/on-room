import {
    accessTokenOptions,
    generateAccessToken,
} from "../controller/sessions.contoller"
import { verifyToken } from "../utils/jwt"
import { NextFunction, Request, Response } from "express"

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken && !refreshToken) return next()

    const { decoded, expired } = verifyToken(accessToken, "access")

    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    if (expired && refreshToken) {
        const { newAccessToken } = await generateAccessToken(refreshToken)

        if (!newAccessToken) return next()

        const { decoded } = verifyToken(newAccessToken, "access")

        res.cookie("accessToken", newAccessToken, accessTokenOptions)

        res.locals.user = decoded

        return next()
    }

    return next()
}

export default deserializeUser
