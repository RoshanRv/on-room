import { object, string, TypeOf } from "zod"

export const classroomSchema = object({
    title: string().min(1),
    img: string(),
    description: string().max(200),
})

export type classroomSchemaInput = TypeOf<typeof classroomSchema>
