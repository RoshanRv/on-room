import { PrismaClient } from "@prisma/client"
import { createAnnouncementSchemaType } from "@schema/announcements.schema"
const prisma = new PrismaClient()

export const createAnnouncement = async (
    data: createAnnouncementSchemaType["body"]
) => {
    try {
        const announcements = await prisma.announcement.create({
            data: data,
        })
        return announcements
    } catch (e: any) {
        throw new Error(e)
    }
}

export const deleteAnnouncement = async (id: string) => {
    try {
        const announcement = await prisma.announcement.delete({
            where: {
                id,
            },
        })
        return announcement
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getAnnouncements = async (classroomId: string) => {
    try {
        const announcements = await prisma.announcement.findMany({
            where: {
                classroomId,
            },
            include: {
                viewedUsers: true,
            },
        })
        return announcements
    } catch (e: any) {
        throw new Error(e)
    }
}

export const connectAnnouncement = async (id: string, studentId: string) => {
    try {
        const announcements = await prisma.announcement.update({
            data: {
                viewedUsers: {
                    connect: {
                        id: studentId,
                    },
                },
            },
            where: {
                id,
            },
        })

        return announcements
    } catch (e: any) {
        throw new Error(e)
    }
}
