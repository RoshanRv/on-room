import {
    createSubmissionSchemaType,
    deleteSubmissionSchemaType,
    getSubmissionsByClassroomIdSchemaType,
    getSubmissionSchemaType,
    updateSubmissionSchemaType,
} from "../schema/submissions.schema"
import {
    createSubmission,
    deleteSubmission,
    getSubmissionsByClassroomId,
    updateSubmission,
} from "../service/submissions.services"
import { Request, Response } from "express"
import path from "path"
import fs from "fs"

export const createSubmissionHandler = async (
    req: Request<createSubmissionSchemaType["params"]>,
    res: Response
) => {
    try {
        const files = req.files
        const { assignmentId } = req.params
        const { id } = res.locals.user

        if (files) {
            const key = Object.keys(files)[0]
            const fileDetails = {
                // @ts-ignore
                filename: files[key].name as string,
                // @ts-ignore
                size: files[key].size as number,
                // @ts-ignore
                type: files[key].name.split(".")[1] as string,
                assignmentId,
                studentId: id,
            }

            const submission = await createSubmission(fileDetails)

            if (submission) {
                const key = Object.keys(files)[0]
                const filePath = path.join(
                    __dirname,
                    `../../uploads/submissions/${submission.id}.${submission.type}`
                )
                // @ts-ignore
                files[key].mv(filePath)
            }
            return res.status(201).send(submission)
        }
        throw new Error("No Files")
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const getSubmissionsHandler = async (
    req: Request<getSubmissionsByClassroomIdSchemaType["params"]>,
    res: Response
) => {
    try {
        const submissions = await getSubmissionsByClassroomId(
            req.params.classroomId
        )
        return res.status(200).send(submissions)
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const getSubmissionByIdHandler = async (
    req: Request<getSubmissionSchemaType["params"]>,
    res: Response
) => {
    try {
        const { submissionId } = req.params
        return res.sendFile(
            path.join(__dirname, `../../uploads/submissions/${submissionId}`)
        )
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const updateSubmissionHandler = async (
    req: Request<
        updateSubmissionSchemaType["params"],
        {},
        updateSubmissionSchemaType["body"]
    >,
    res: Response
) => {
    try {
        const { submissionId } = req.params
        const { body } = req
        const submissions = await updateSubmission(submissionId, body)
        return res.status(200).send(submissions)
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const deleteSubmissionHandler = async (
    req: Request<deleteSubmissionSchemaType["params"]>,
    res: Response
) => {
    try {
        const { submissionId } = req.params
        fs.unlink(
            path.join(__dirname, `../../uploads/submissions/${submissionId}`),
            async (err) => {
                if (err) {
                    throw new Error(err.message)
                }
                // assignmentId = fasefadsfadsf.png thus using split

                const submissions = await deleteSubmission(
                    submissionId.split(".")[0]
                )
                return res.status(200).send(submissions)
            }
        )
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}
