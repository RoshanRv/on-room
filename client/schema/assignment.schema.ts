import { object, string, TypeOf } from "zod"

const assignmentProps = {
    name: string().min(1, "Name is Required"),
    dueDate: string().min(1, "Date is Required"),
    description: string().optional(),
}

export const createAssignmentSchema = object({ ...assignmentProps })

export type AssignmentSchemaInput = TypeOf<typeof createAssignmentSchema>
