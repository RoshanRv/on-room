import { number, object, string, TypeOf } from "zod"

const assignmentIdParams = {
    params: object({
        assignmentId: string().min(1),
    }),
}
const submissionIdParams = {
    params: object({
        submissionId: string().min(1),
    }),
}
const classroomIdParams = {
    params: object({
        classroomId: string().min(1),
    }),
}

const updateSubmission = {
    body: object({
        grade: number().optional(),
    }),
}

export const createSubmissionSchema = object({ ...assignmentIdParams })

export const getSubmissionsByClassroomIdSchema = object({
    ...classroomIdParams,
})

export const deleteSubmissionSchema = object({ ...submissionIdParams })
export const updateSubmissionSchema = object({
    ...submissionIdParams,
    ...updateSubmission,
})
export const getSubmissionSchema = object({ ...submissionIdParams })

export type createSubmissionSchemaType = TypeOf<typeof createSubmissionSchema>
export type getSubmissionsByClassroomIdSchemaType = TypeOf<
    typeof getSubmissionsByClassroomIdSchema
>
export type deleteSubmissionSchemaType = TypeOf<typeof deleteSubmissionSchema>
export type updateSubmissionSchemaType = TypeOf<typeof updateSubmissionSchema>
export type getSubmissionSchemaType = TypeOf<typeof getSubmissionSchema>
