import {
    createAssignmentSchemaType,
    deleteAssignmentSchemaType,
    getAssignmentByIdSchemaType,
    getAssignmentsByClassroomIdSchemaType,
    updateAssignmentSchemaType,
} from "@schema/assignments.schema"
import {
    createAssignment,
    deleteAssignment,
    getAssignmentById,
    getAssignmentsByClassroomId,
    updateAssignment,
} from "@service/assignments.services"
import { Request, Response } from "express"

export const createAssignmentHandler = async (
    req: Request<{}, {}, createAssignmentSchemaType["body"]>,
    res: Response
) => {
    try {
        const { body } = req
        const assignment = await createAssignment(body)
        return res.status(201).send(assignment)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

//fetches assignments which belongs to a classroom id
export const getAssignmentsByClassroomIdHandler = async (
    req: Request<getAssignmentsByClassroomIdSchemaType["params"]>,
    res: Response
) => {
    try {
        const { classroomId } = req.params
        const assignments = await getAssignmentsByClassroomId(classroomId)
        return res.status(200).send(assignments)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

//fetches assignment using assignment id
export const getAssignmentByIdHandler = async (
    req: Request<getAssignmentByIdSchemaType["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params
        const assignment = await getAssignmentById(id)
        return res.status(200).send(assignment)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const updateAssignmentHandler = async (
    req: Request<
        updateAssignmentSchemaType["params"],
        {},
        updateAssignmentSchemaType["body"]
    >,
    res: Response
) => {
    try {
        const { id } = req.params
        const { body } = req
        const assignment = await updateAssignment(id, body)
        return res.status(201).send(assignment)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const deleteAssignmentHandler = async (
    req: Request<deleteAssignmentSchemaType["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params
        const assignment = await deleteAssignment(id)
        return res.status(204).send(assignment)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

// export const
