import { object, string, TypeOf } from "zod"

export const createAssignmentSchema = object({
    name: string().min(1, "Name is Required"),
    dueDate: string().min(1, "Date is Required"),
    description: string().optional(),
})

export type AssignmentSchemaInput = TypeOf<typeof createAssignmentSchema>
