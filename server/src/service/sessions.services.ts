import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createSession = async (userId: string) => {
    try {
        const session = await prisma.session.create({
            data: {
                userId,
            },
        })
        return session
    } catch (e: any) {
        throw new Error(e)
    }
}

export const findSessionById = async (sessionId: string) => {
    try {
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId,
            },
        })

        return session
    } catch (e: any) {
        throw new Error(e)
    }
}
