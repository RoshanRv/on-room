import { sign, verify } from "jsonwebtoken"
import { createUserSchemaType } from "../schema/users.schema"
import config from "config"

type PayloadType = Omit<createUserSchemaType["body"], "password"> & {
    id: string
    sessionId: string
}

type TokenType = "access" | "refresh"

export const signToken = (payload: PayloadType, type: TokenType) => {
    try {
        const secret =
            type == "access"
                ? process.env.ACCESS_TOKEN_SECRET!
                : process.env.REFRESH_TOKEN_SECRET!

        const expiresIn =
            type === "access"
                ? config.get<string>("accessTokenLife")
                : config.get<string>("refreshTokenLife")

        const token = sign(payload, secret, {
            expiresIn,
        })

        return token
    } catch (e: any) {
        console.log(e)

        throw new Error("Error Signing Token")
    }
}

export const verifyToken = (token: string, type: TokenType) => {
    try {
        const secret =
            type == "access"
                ? process.env.ACCESS_TOKEN_SECRET!
                : process.env.REFRESH_TOKEN_SECRET!
        const decoded = verify(token, secret)
        return {
            valid: true,
            expired: false,
            decoded: decoded as PayloadType,
        }
    } catch (e) {
        console.log(e)
        return {
            valid: false,
            expired: true,
            decoded: null,
        }
    }
}
