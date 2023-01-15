import { Express, Request, Response } from "express"
import validateInput from "./middleware/validateInput"
import { createUserSchema } from "./schema/users.schema"
import { createUserHandler } from "./controller/users.controller"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    //  Create New User
    app.post("/api/users", validateInput(createUserSchema), createUserHandler)
}

export default routes
