import { object, string, TypeOf } from "zod"

export const createClassroomSchema = object({
    body: object({
        title: string().min(1),
        description: string().max(260).optional(),
        img: string().optional(),
    }),
})

export type createClassroomSchemaType = TypeOf<typeof createClassroomSchema>
