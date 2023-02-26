import {
    createClassroomSchemaType,
    deleteClassroomSchemaType,
    enrollClassroomSchemaType,
    getClassroomByIdSchemaType,
    unEnrollClassroomSchemaType,
    updateClassroomByIdSchemaType,
} from "@schema/classroom.schema"
import {
    createClassroom,
    deleteClassroom,
    enrollClassroom,
    getClassroomById,
    getClassroomByTeacherId,
    getClassrooms,
    getEnrolledClassroomByStudentId,
    unEnrollClassroom,
    updateClassroomById,
} from "@service/classrooms.services"
import { Request, Response } from "express"
import { omit } from "lodash"

export const createClassroomHandler = async (
    req: Request<{}, {}, createClassroomSchemaType["body"]>,
    res: Response
) => {
    try {
        const { user } = res.locals
        const { body } = req

        const classroom = await createClassroom({
            ...body,
            teacherId: user.id as string,
        })

        return res.status(201).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const getMyClassroomHandler = async (req: Request, res: Response) => {
    try {
        const { user } = res.locals

        if (user.role === "teacher") {
            // fetches classroom created by teacher if user is teacher

            const classroom = await getClassroomByTeacherId(user.id)
            return res.status(200).send(classroom)
        } else if (user.role === "student") {
            // fetches classroom enrolled by student if user is student

            const classroom = await getEnrolledClassroomByStudentId(user.id)
            return res.status(200).send(classroom)
        }
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

// fetches all classrooms
export const getClassroomHandler = async (req: Request, res: Response) => {
    try {
        const { user } = res.locals
        const classroom = await getClassrooms(user.id)
        return res.status(200).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const getClassroomByIdHandler = async (
    req: Request<getClassroomByIdSchemaType["params"], {}, {}>,
    res: Response
) => {
    try {
        const { id } = req.params

        const classroom = await getClassroomById(id)
        return res.status(200).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const updateClassroomByIdHandler = async (
    req: Request<
        updateClassroomByIdSchemaType["params"],
        {},
        updateClassroomByIdSchemaType["body"]
    >,
    res: Response
) => {
    try {
        const { id } = req.params
        const { body } = req

        const classroom = await updateClassroomById(id, body)
        return res.status(200).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

// enrolls student in a existing classroom
export const enrollClassroomHandler = async (
    req: Request<{}, {}, enrollClassroomSchemaType["body"]>,
    res: Response
) => {
    try {
        const { user } = res.locals
        const { id } = req.body

        const classroom = await enrollClassroom(id, user.id)
        return res.status(201).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

// unenrolls student in a existing classroom
export const unEnrollClassroomHandler = async (
    req: Request<{}, {}, unEnrollClassroomSchemaType["body"]>,
    res: Response
) => {
    try {
        const { user } = res.locals
        const { id } = req.body

        const classroom = await unEnrollClassroom(id, user.id)
        return res.status(201).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

// delete classroom
export const deleteClassroomHandler = async (
    req: Request<deleteClassroomSchemaType["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params

        const classroom = await deleteClassroom(id)
        return res.status(204).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}
