import {
    connectAnnouncementSchemaType,
    createAnnouncementSchemaType,
    deleteAnnouncementSchemaType,
    getAnnouncementsSchemaType,
} from "@schema/announcements.schema"
import {
    connectAnnouncement,
    createAnnouncement,
    deleteAnnouncement,
    getAnnouncements,
} from "@service/announcements.services"
import { Request, Response } from "express"

export const createAnnouncementHandler = async (
    req: Request<{}, {}, createAnnouncementSchemaType["body"]>,
    res: Response
) => {
    try {
        const data = req.body
        const announcement = await createAnnouncement(data)
        return res.status(201).send(announcement)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const getAnnouncementsHandler = async (
    req: Request<getAnnouncementsSchemaType["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params
        const announcements = await getAnnouncements(id)
        return res.status(200).send(announcements)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const connectAnnouncementHandler = async (
    req: Request<{}, {}, connectAnnouncementSchemaType["body"]>,
    res: Response
) => {
    try {
        const { announcementId } = req.body
        const studentId = res.locals.user.id
        const announcement = await connectAnnouncement(
            announcementId,
            studentId
        )
        return res.status(201).send(announcement)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const deleteAnnouncementHandler = async (
    req: Request<deleteAnnouncementSchemaType["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params
        const announcement = await deleteAnnouncement(id)
        return res.status(200).send(announcement)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}
