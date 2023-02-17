import { createUserSchemaType } from "@schema/users.schema"
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
export const findUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}

export const updateUserById = async (
    id: string,
    data: { name: string; img: string }
) => {
    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
        })

        return user
    } catch (e: any) {
        throw new Error(e)
    }
}

export const findStudentsByClassroom = async (id: string) => {
    try {
        const students = await prisma.user.findMany({
            where: {
                enrolledIn: {
                    some: { id },
                },
            },
        })

        return students
    } catch (e: any) {
        throw new Error(e)
    }
}
