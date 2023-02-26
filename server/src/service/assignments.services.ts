import { PrismaClient } from "@prisma/client"
import {
    createAssignmentSchemaType,
    updateAssignmentSchemaType,
} from "@schema/assignments.schema"
const prisma = new PrismaClient()

export const createAssignment = async (
    data: createAssignmentSchemaType["body"]
) => {
    try {
        const assignment = await prisma.assignment.create({
            data,
        })
        return assignment
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getAssignmentsByClassroomId = async (classroomId: string) => {
    try {
        const assignments = await prisma.assignment.findMany({
            where: {
                classroomId,
            },
        })
        return assignments
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getAssignmentById = async (id: string) => {
    try {
        const assignment = await prisma.assignment.findUnique({
            where: {
                id,
            },
        })
        return assignment
    } catch (e: any) {
        throw new Error(e)
    }
}

export const updateAssignment = async (
    id: string,
    data: updateAssignmentSchemaType["body"]
) => {
    try {
        const assignment = await prisma.assignment.update({
            where: {
                id,
            },
            data,
        })
        return assignment
    } catch (e: any) {
        throw new Error(e)
    }
}

export const deleteAssignment = async (id: string) => {
    try {
        const assignment = await prisma.assignment.delete({
            where: {
                id,
            },
        })
        return assignment
    } catch (e: any) {
        throw new Error(e)
    }
}
