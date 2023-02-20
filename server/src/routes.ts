import { Express, Request, Response } from "express"
import validateInput from "@middleware/validateInput"
import {
    createUserSchema,
    findStudentsByClassroomSchema,
    updateUserSchema,
} from "@schema/users.schema"
import {
    createUserHandler,
    findStudentsByClassroomHandler,
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
    deleteClassroomSchema,
    enrollClassroomSchema,
    getClassroomByIdSchema,
    unEnrollClassroomSchema,
    updateClassroomByIdSchema,
} from "@schema/classroom.schema"
import {
    createClassroomHandler,
    deleteClassroomHandler,
    enrollClassroomHandler,
    getClassroomByIdHandler,
    getClassroomHandler,
    getMyClassroomHandler,
    unEnrollClassroomHandler,
    updateClassroomByIdHandler,
} from "@controller/classrooms.controller"
import {
    createAssignmentSchema,
    deleteAssignmentSchema,
    getAssignmentByIdSchema,
    getAssignmentsByClassroomIdSchema,
    updateAssignmentSchema,
} from "@schema/assignments.schema"
import {
    createAssignmentHandler,
    deleteAssignmentHandler,
    getAssignmentByIdHandler,
    getAssignmentsByClassroomIdHandler,
    updateAssignmentHandler,
} from "@controller/assignments.controller"

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

    app.get(
        "/api/classroom/:id",
        [requireUser, validateInput(getClassroomByIdSchema)],
        getClassroomByIdHandler
    )

    app.put(
        "/api/classroom/:id",
        [requireTeacher, validateInput(updateClassroomByIdSchema)],
        updateClassroomByIdHandler
    )

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

    app.get(
        "/api/classroom/enrolled/:classroomId",
        [requireUser, validateInput(findStudentsByClassroomSchema)],
        findStudentsByClassroomHandler
    )

    app.delete(
        "/api/classroom/:id",
        [requireTeacher, validateInput(deleteClassroomSchema)],
        deleteClassroomHandler
    )

    //   enroll classroom
    app.post(
        "/api/classroom/enroll",
        [requireStudent, validateInput(enrollClassroomSchema)],
        enrollClassroomHandler
    )

    //   unenroll classroom
    app.post(
        "/api/classroom/unenroll",
        [requireStudent, validateInput(unEnrollClassroomSchema)],
        unEnrollClassroomHandler
    )

    //     assignmentss
    app.post(
        "/api/assignment",
        [requireTeacher, validateInput(createAssignmentSchema)],
        createAssignmentHandler
    )

    // fetches assignments based on classroom id
    app.get(
        "/api/assignment/classroom/:classroomId",
        [requireUser, validateInput(getAssignmentsByClassroomIdSchema)],
        getAssignmentsByClassroomIdHandler
    )

    // fetches single assignment using id
    app.get(
        "/api/assignment/:id",
        [requireUser, validateInput(getAssignmentByIdSchema)],
        getAssignmentByIdHandler
    )

    app.put(
        "/api/assignment/:id",
        [requireTeacher, validateInput(updateAssignmentSchema)],
        updateAssignmentHandler
    )
    app.delete(
        "/api/assignment/:id",
        [requireTeacher, validateInput(deleteAssignmentSchema)],
        deleteAssignmentHandler
    )
}

export default routes
