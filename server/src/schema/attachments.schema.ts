import { array, number, object, string, TypeOf } from "zod"

const params = {
    params: object({
        assignmentId: string().min(1),
    }),
}

export const createAttachmentSchema = object({
    // body: array(
    //     object({
    //         filename: string().min(1),
    //         type: string().min(1),
    //         size: number().min(1),
    //         assignmentId: string().min(1),
    //     })
    // ),

    params: object({
        assignmentId: string().min(1),
    }),
})

export const getAttachmentAssignmentIdSchema = object({ ...params })
export const getAttachmentByIdSchema = object({
    params: object({
        attachmentId: string().min(1),
    }),
})

export type createAttachmentSchemaType = TypeOf<typeof createAttachmentSchema>
export type getAttachmentAssignmentIdSchemaType = TypeOf<
    typeof getAttachmentAssignmentIdSchema
>
export type downloadAttachmentSchemaType = TypeOf<
    typeof getAttachmentByIdSchema
>
