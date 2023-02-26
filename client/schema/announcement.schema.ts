import { object, string, TypeOf } from "zod"

export const createAnnouncementSchema = object({
    title: string().min(1, "Title is Required"),
    description: string().min(1, "Description is Required"),
})

export type AnnouncementSchemaInput = TypeOf<typeof createAnnouncementSchema>
