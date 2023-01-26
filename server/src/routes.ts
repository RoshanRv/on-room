import { Express, Request, Response } from "express"
import validateInput from "@middleware/validateInput"
import { createUserSchema } from "@schema/users.schema"
import { createUserHandler } from "@controller/users.controller"
import { createSessionSchema } from "@schema/sessions.schema"
import {
    createSessionHandler,
    deleteSessionHandler,
    getCurrentUserHandler,
} from "@controller/sessions.contoller"
import requireUser, { requireTeacher } from "@middleware/requireUser"
import { createClassroomSchema } from "@schema/classroom.schema"
import {
    createClassroomHandler,
    getClassroomHandler,
} from "@controller/classrooms.controller"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    //  Create New User
    app.post("/api/users", validateInput(createUserSchema), createUserHandler)

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

    app.get("/api/classroom", requireUser, getClassroomHandler)

    // create classroom
    app.post(
        "/api/classroom",
        [requireUser, requireTeacher, validateInput(createClassroomSchema)],
        createClassroomHandler
    )
}

export default routes
