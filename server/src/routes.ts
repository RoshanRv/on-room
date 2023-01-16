import { Express, Request, Response } from "express"
import validateInput from "@middleware/validateInput"
import { createUserSchema } from "@schema/users.schema"
import { createUserHandler } from "@controller/users.controller"
import { createSessionSchema } from "@schema/sessions.schema"
import {
    createSessionHandler,
    getCurrentUserHandler,
} from "@controller/sessions.contoller"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    //  Create New User
    app.post("/api/users", validateInput(createUserSchema), createUserHandler)

    // create new session / login
    app.post(
        "/api/sessions",
        validateInput(createSessionSchema),
        createSessionHandler
    )

    app.get("/api/me", getCurrentUserHandler)
}

export default routes
