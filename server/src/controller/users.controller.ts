import { Request, Response } from "express"
import {
    createUserSchemaType,
    findStudentsByClassroomType,
    updateUserSchemaType,
} from "../schema/users.schema"
import {
    createUser,
    findStudentsByClassroom,
    findUserByEmail,
    getAllStudentsExceptEnrolled,
    updateUserById,
} from "../service/users.services"
import { hashSync } from "bcryptjs"
import { omit } from "lodash"

export const createUserHandler = async (
    req: Request<{}, {}, createUserSchemaType["body"]>,
    res: Response
) => {
    try {
        const { body } = req
        const user = await findUserByEmail(body.email)

        if (user) {
            return res.status(400).send("Email is Taken")
        }

        const hashedPassword = hashSync(body.password, 10)
        body.password = hashedPassword
        const newUser = await createUser(body)

        return res.status(201).send(omit(newUser, ["password"]))
    } catch (e: any) {
        console.log(e)
        return res.status(400).send(e.message)
    }
}

export const updateUserHandler = async (
    req: Request<{}, {}, updateUserSchemaType["body"]>,
    res: Response
) => {
    try {
        const { body } = req
        const { user } = res.locals

        console.log(res.locals)

        const updatedUser = await updateUserById(user.id as string, body)
        return res.status(201).send(updatedUser)
    } catch (e: any) {
        console.log(e)
        return res.status(400).send(e.message)
    }
}

export const findStudentsByClassroomHandler = async (
    req: Request<findStudentsByClassroomType["params"]>,
    res: Response
) => {
    try {
        const { classroomId } = req.params
        const students = await findStudentsByClassroom(classroomId)
        return res.status(200).send(students)
    } catch (e: any) {
        console.log(e)
        return res.status(400).send(e.message)
    }
}

export const getAllStudentsExceptEnrolledHander = async (
    req: Request<findStudentsByClassroomType["params"]>,
    res: Response
) => {
    try {
        const { classroomId } = req.params
        const students = await getAllStudentsExceptEnrolled(classroomId)
        return res.status(200).send(students)
    } catch (e: any) {
        console.log(e)
        return res.status(400).send(e.message)
    }
}
