import prisma from "../client"

interface attachmentsType {
    filename: string
    size: number
    type: string
    assignmentId: string
}

export const createAttachments = async (data: attachmentsType[]) => {
    try {
        // used this approach instead of createMany as createMany returns only the count not inserted data
        const attachments = await prisma.$transaction(
            data.map((d: any) =>
                prisma.attachment.create({
                    data: d,
                })
            )
        )

        return attachments
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getAttachmentAssignmentId = async (assignmentId: string) => {
    try {
        const attachments = await prisma.attachment.findMany({
            where: {
                assignmentId,
            },
        })

        return attachments
    } catch (e: any) {
        throw new Error(e)
    }
}

export const deleteAttachmentById = async (attachmentId: string) => {
    try {
        const attachment = await prisma.attachment.delete({
            where: {
                id: attachmentId,
            },
        })

        return attachment
    } catch (e: any) {
        throw new Error(e)
    }
}
