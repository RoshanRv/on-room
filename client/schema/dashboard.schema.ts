import { literal, number, object, string, TypeOf } from "zod"

export const classroomSchema = object({
    title: string().min(1, "Title is Required"),
    img: string().url().or(literal("")),
    description: string().max(200),
})

export type ClassroomSchemaInput = TypeOf<typeof classroomSchema>
