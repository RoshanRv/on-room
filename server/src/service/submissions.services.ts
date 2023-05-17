import { updateSubmissionSchemaType } from "../schema/submissions.schema"
import prisma from "../client"

export const getSubmissionsByClassroomId = async (classroomId: string) => {
    try {
        const submission = await prisma.submission.findMany({
            where: {
                assignment: {
                    classroomId,
                },
            },
            include: {
                student: true,
                assignment: true,
            },
        })

        return submission
    } catch (e: any) {
        throw new Error(e)
    }
}

interface submissionsType {
    filename: string
    size: number
    type: string
    assignmentId: string
    studentId: string
}

export const createSubmission = async (data: submissionsType) => {
    try {
        const submission = prisma.submission.create({
            data,
        })
        return submission
    } catch (e: any) {
        throw new Error(e)
    }
}

export const updateSubmission = async (
    id: string,
    data: updateSubmissionSchemaType["body"]
) => {
    try {
        const submission = prisma.submission.update({
            where: {
                id,
            },
            data,
        })

        return submission
    } catch (e: any) {
        throw new Error(e)
    }
}

export const deleteSubmission = async (id: string) => {
    try {
        const submission = prisma.submission.delete({
            where: {
                id,
            },
        })

        return submission
    } catch (e: any) {
        throw new Error(e)
    }
}
