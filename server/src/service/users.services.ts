import { createUserSchemaType } from "../schema/users.schema"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createUser = async (userData: createUserSchemaType["body"]) => {
    try {
        const user = await prisma.user.create({
            data: userData,
        })

        return user
    } catch (e: any) {
        throw new Error(e)
    }
}

export const findUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}
