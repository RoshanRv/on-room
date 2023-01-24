import { createClassroomSchemaType } from "@schema/classroom.schema"
import { createClassroom, getClassroom } from "@service/classrooms.services"
import { Request, Response } from "express"

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
        const classroom = await getClassroom(user.id as string)

        console.log(classroom)

        return res.status(200).send(classroom)
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}
