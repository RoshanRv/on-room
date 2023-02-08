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

export const getClassroomByTeacherId = async (teacherId: string) => {
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

export const getClassrooms = async (id: string) => {
    try {
        const classroom = await prisma.classroom.findMany({
            include: {
                teacher: true,
            },
            where: {
                student: {
                    none: {
                        id,
                    },
                },
            },
        })

        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}

export const enrollClassroom = async (id: string, studentId: string) => {
    try {
        const classroom = await prisma.classroom.update({
            where: {
                id,
            },
            data: {
                student: {
                    connect: {
                        id: studentId,
                    },
                },
            },
        })
        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getEnrolledClassroomByStudentId = async (id: string) => {
    try {
        const classroom = await prisma.classroom.findMany({
            where: {
                student: {
                    some: {
                        id,
                    },
                },
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
