import { Express, Request, Response } from "express"
import validateInput from "@middleware/validateInput"
import { createUserSchema, updateUserSchema } from "@schema/users.schema"
import {
    createUserHandler,
    updateUserHandler,
} from "@controller/users.controller"
import { createSessionSchema } from "@schema/sessions.schema"
import {
    createSessionHandler,
    deleteSessionHandler,
    getCurrentUserHandler,
} from "@controller/sessions.contoller"
import requireUser, {
    requireStudent,
    requireTeacher,
} from "@middleware/requireUser"
import {
    createClassroomSchema,
    enrollClassroomSchema,
} from "@schema/classroom.schema"
import {
    createClassroomHandler,
    enrollClassroomHandler,
    getClassroomHandler,
    getMyClassroomHandler,
} from "@controller/classrooms.controller"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    //  Create New User
    app.post("/api/users", validateInput(createUserSchema), createUserHandler)
    //  Update User
    app.put(
        "/api/users",
        [requireUser, validateInput(updateUserSchema)],
        updateUserHandler
    )

    // get current user using token
    app.get("/api/me", requireUser, getCurrentUserHandler)

    // create new session / login
    app.post(
        "/api/sessions",
        validateInput(createSessionSchema),
        createSessionHandler
    )

    // logout and delete session
    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    //      fetches all classrooms
    app.get("/api/classroom", requireUser, getClassroomHandler)

    // fetches created classroom by teacher or enrolled classroom by students
    app.get("/api/myclassroom", requireUser, getMyClassroomHandler)

    // create classroom
    app.post(
        "/api/classroom",
        [requireTeacher, validateInput(createClassroomSchema)],
        createClassroomHandler
    )

    //   enroll classroom
    app.post(
        "/api/classroom/enroll",
        [requireStudent, validateInput(enrollClassroomSchema)],
        enrollClassroomHandler
    )
}

export default routes
