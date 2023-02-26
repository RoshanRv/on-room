import { object, string, TypeOf } from "zod"

export const createAnnouncementSchema = object({
    body: object({
        title: string().min(1),
        description: string().min(1),
        classroomId: string().min(1),
    }),
})

export const connectAnnouncementSchema = object({
    body: object({
        announcementId: string().min(1),
    }),
})

const params = {
    params: object({ id: string().min(1) }),
}

export const deleteAnnouncementSchema = object({ ...params })
export const getAnnouncementsSchema = object({ ...params })

export type createAnnouncementSchemaType = TypeOf<
    typeof createAnnouncementSchema
>
export type connectAnnouncementSchemaType = TypeOf<
    typeof connectAnnouncementSchema
>
export type deleteAnnouncementSchemaType = TypeOf<
    typeof deleteAnnouncementSchema
>
export type getAnnouncementsSchemaType = TypeOf<typeof getAnnouncementsSchema>
