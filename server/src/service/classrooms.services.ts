import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { omit } from "lodash"

interface ClassroomBody {
    title: string
    description?: string
    img?: string
}

type createClassroomType = ClassroomBody & {
    teacherId: string
}

export const createClassroom = async (data: createClassroomType) => {
    try {
        const classroom = await prisma.classroom.create({
            data: data,
        })

        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getClassroom = async (teacherId: string) => {
    try {
        const classroom = await prisma.classroom.findMany({
            where: {
                teacherId,
            },

            include: {
                teacher: true,
            },
        })

        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}
