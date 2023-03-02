import { Express, Request, Response } from "express"
import fileUpload, { FileArray } from "express-fileupload"
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
import {
    connectAnnouncementSchema,
    createAnnouncementSchema,
    getAnnouncementsSchema,
} from "@schema/announcements.schema"
import {
    connectAnnouncementHandler,
    createAnnouncementHandler,
    deleteAnnouncementHandler,
    getAnnouncementsFromEnrolledClassroomHandler,
    getAnnouncementsHandler,
} from "@controller/announcements.controller"

import path from "path"
import {
    createAttachmentSchema,
    getAttachmentAssignmentIdSchema,
} from "@schema/attachments.schema"
import {
    createAttachmentsHandler,
    downloadAttachmentHandler,
    getAttachmentAssignmentIdHandler,
} from "@controller/attachments.controller"
import { createAttachments } from "@service/attachments.services"

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.get(
        "/api/classroom/announcements",
        requireUser,
        getAnnouncementsFromEnrolledClassroomHandler
    )

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

    //     Announcements

    app.post(
        "/api/announcement",
        [requireTeacher, validateInput(createAnnouncementSchema)],
        createAnnouncementHandler
    )

    app.get(
        "/api/announcement/:id",
        [requireUser, validateInput(getAnnouncementsSchema)],
        getAnnouncementsHandler
    )

    app.put(
        "/api/announcement",
        [requireUser, validateInput(connectAnnouncementSchema)],
        connectAnnouncementHandler
    )

    app.delete(
        "/api/announcement/:id",
        [requireUser, validateInput(deleteAssignmentSchema)],
        deleteAnnouncementHandler
    )

    //          Create New Attachments
    // app.post(
    //     "/api/attachment",
    //     [requireTeacher, validateInput(createAttachmentSchema)],
    //     createAttachmentsHandler
    // )

    // app.get("/api/uploads", (req: Request, res: Response) => {
    //     res.sendFile(path.join(__dirname, "../uploads/Novicers-doc.pdf"))

    //     // res.download(path.join(__dirname, "../uploads/id.jpeg"), (err) => {
    //     //     if (err) console.log(err)
    //     // })
    // })

    app.get(
        "/api/attachment/:attachmentId/download",
        requireUser,
        downloadAttachmentHandler
    )

    app.post(
        "/api/attachment/:assignmentId",
        [requireTeacher, validateInput(createAttachmentSchema)],
        createAttachmentsHandler
    )

    app.get(
        "/api/attachment/:assignmentId",
        [requireUser, validateInput(getAttachmentAssignmentIdSchema)],
        getAttachmentAssignmentIdHandler
    )
}

export default routes
