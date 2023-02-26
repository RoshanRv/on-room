import { object, string, date, TypeOf } from "zod"

const params = {
    params: object({
        id: string().min(1),
    }),
}

export const createAssignmentSchema = object({
    body: object({
        name: string().min(1),
        dueDate: string().min(1),
        description: string().optional(),
        classroomId: string().min(1),
    }),
})

export const updateAssignmentSchema = object({
    body: object({
        name: string().min(1),
        dueDate: string().min(1),
        description: string().optional(),
    }),
    params: params.params,
})

export const getAssignmentsByClassroomIdSchema = object({
    params: object({
        classroomId: string().min(1),
    }),
})

export const deleteAssignmentSchema = object({ ...params })
export const getAssignmentByIdSchema = object({ ...params })

export type createAssignmentSchemaType = TypeOf<typeof createAssignmentSchema>
export type updateAssignmentSchemaType = TypeOf<typeof updateAssignmentSchema>
export type deleteAssignmentSchemaType = TypeOf<typeof deleteAssignmentSchema>
export type getAssignmentByIdSchemaType = TypeOf<typeof getAssignmentByIdSchema>
export type getAssignmentsByClassroomIdSchemaType = TypeOf<
    typeof getAssignmentsByClassroomIdSchema
>
