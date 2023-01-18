import { Response, Request, NextFunction } from "express"

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals
    if (!user) res.status(401).send("Valid Token Not Found")
    return next()
}

export default requireUser
