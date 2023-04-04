import {
    createAttachmentSchemaType,
    downloadAttachmentSchemaType,
    getAttachmentAssignmentIdSchemaType,
} from "@schema/attachments.schema"
import {
    createAttachments,
    deleteAttachmentById,
    getAttachmentAssignmentId,
} from "@service/attachments.services"
import { Request, Response } from "express"
import path from "path"
import fs from "fs"

export const createAttachmentsHandler = async (
    req: Request<createAttachmentSchemaType["params"]>,
    res: Response
) => {
    try {
        const files = req.files
        const { assignmentId } = req.params

        if (files) {
            const fileDetails = Object.keys(files).map((key: string) => ({
                // @ts-ignore
                filename: files[key].name as string,
                // @ts-ignore
                size: files[key].size as number,
                // @ts-ignore
                type: files[key].name.split(".")[1] as string,
                assignmentId,
            }))

            const attachments = await createAttachments(fileDetails)

            if (attachments) {
                Object.keys(files).forEach((key, i) => {
                    const filePath = path.join(
                        __dirname,
                        `../../uploads/attachments/${attachments[i].id}.${attachments[i].type}`
                    )

                    // @ts-ignore
                    files[key].mv(filePath)
                })
            }
            return res.status(201).send(attachments)
        }
        throw new Error("No Files")
    } catch (e: any) {
        return res.status(400).send(e.message)
    }
}

export const getAttachmentAssignmentIdHandler = async (
    req: Request<getAttachmentAssignmentIdSchemaType["params"]>,
    res: Response
) => {
    try {
        const attachments = await getAttachmentAssignmentId(
            req.params.assignmentId
        )

        // console.log({ attachments, id: req.params.assignmentId })

        return res.status(200).send(attachments)
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const getAttachmentByIdHandler = async (
    req: Request<downloadAttachmentSchemaType["params"]>,
    res: Response
) => {
    try {
        const { attachmentId } = req.params
        return res.sendFile(
            path.join(__dirname, `../../uploads/attachments/${attachmentId}`)
        )
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}

export const deleteAttachmentByIdHandler = async (
    req: Request<downloadAttachmentSchemaType["params"]>,
    res: Response
) => {
    try {
        const { attachmentId } = req.params
        fs.unlink(
            path.join(__dirname, `../../uploads/attachments/${attachmentId}`),
            async (err) => {
                if (err) {
                    console.log(err)

                    throw new Error(err.message)
                }
                // assignmentId = fasefadsfadsf.png thus using split
                const attachment = await deleteAttachmentById(
                    attachmentId.split(".")[0]
                )
                return res.status(204).send(attachment)
            }
        )
    } catch (e: any) {
        return res.status(404).send(e.message)
    }
}
