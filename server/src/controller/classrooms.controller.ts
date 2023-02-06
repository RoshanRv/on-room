import { createClassroomSchemaType } from "@schema/classroom.schema"
import {
    createClassroom,
    enrollClassroom,
    getClassroomByTeacherId,
    getClassrooms,
} from "@service/classrooms.services"
import { log } from "console"
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

export const getClassroomHandler = async (req: Request, res: Response) => {
    try {
        const { user } = res.locals
        if (user.role === "teacher") {
            const classroom = await getClassroomByTeacherId(user.id as string)
            return res.status(200).send(classroom)
        } else if (user.role === "student") {
            const classroom = await getClassrooms()
            return res.status(200).send(classroom)
        }
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const handleEnrollClassroom = async (req: Request, res: Response) => {
    try {
        const { user } = res.locals
        const { id } = req.body
        console.log(req.body)

        const student = omit(user, ["iat", "exp", "sessionId"])
        const classroom = await enrollClassroom(id, student)
        return res.status(201).send(classroom)
    } catch (e: any) {
        console.log(e)

        return res.status(400).send(e.message)
    }
}
