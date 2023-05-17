import { updateClassroomByIdSchemaType } from "../schema/classroom.schema"
import { Response } from "express"
import { omit } from "lodash"
import prisma from "../client"

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

export const getClassroomById = async (id: string) => {
    try {
        const classroom = await prisma.classroom.findUnique({
            where: {
                id,
            },
            include: {
                announcements: true,
                assignments: true,
                student: true,
            },
        })
        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}

export const updateClassroomById = async (
    id: string,
    data: updateClassroomByIdSchemaType["body"]
) => {
    try {
        const classroom = await prisma.classroom.update({
            where: {
                id,
            },
            data,
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

export const unEnrollClassroom = async (id: string, studentId: string) => {
    try {
        const classroom = await prisma.classroom.update({
            where: {
                id,
            },
            data: {
                student: {
                    disconnect: {
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

export const deleteClassroom = async (id: string) => {
    try {
        const classroom = await prisma.classroom.delete({
            where: {
                id,
            },
        })
        return classroom
    } catch (e: any) {
        throw new Error(e)
    }
}
