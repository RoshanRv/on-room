import { Response, Request, NextFunction } from "express"
import { AnyZodObject } from "zod"

const validateInput =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            })
            next()
        } catch (e: any) {
            console.log(e)
            res.status(409).send(e.errors)
        }
    }

export default validateInput
