import { Response, Request, NextFunction } from "express"

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals
    if (!user) res.status(401).send("Valid Token Not Found")
    return next()
}

export default requireUser

export const requireTeacher = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = res.locals
    if (user.role === "student") res.status(403).send("Teachers Only")
    return next()
}
