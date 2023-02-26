import { object, string, TypeOf } from "zod"

const payload = {
    body: object({
        title: string().min(1),
        description: string().max(260).optional(),
        img: string().optional(),
    }),
}

const params = {
    params: object({
        id: string().min(1),
    }),
}

export const enrollClassroomSchema = object({
    body: object({
        id: string().min(1),
    }),
})

export const unEnrollClassroomSchema = object({
    body: object({
        id: string().min(1),
    }),
})

export const createClassroomSchema = object({ ...payload })
export const deleteClassroomSchema = object({ ...params })
export const getClassroomByIdSchema = object({ ...params })
export const updateClassroomByIdSchema = object({ ...payload, ...params })

export type createClassroomSchemaType = TypeOf<typeof createClassroomSchema>
export type deleteClassroomSchemaType = TypeOf<typeof deleteClassroomSchema>
export type enrollClassroomSchemaType = TypeOf<typeof enrollClassroomSchema>
export type unEnrollClassroomSchemaType = TypeOf<typeof unEnrollClassroomSchema>
export type getClassroomByIdSchemaType = TypeOf<typeof getClassroomByIdSchema>
export type updateClassroomByIdSchemaType = TypeOf<
    typeof updateClassroomByIdSchema
>
