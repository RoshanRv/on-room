import Table from "@components/Table/Table"
import React from "react"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import { FiEye } from "react-icons/fi"
import useActions from "@store/useActions"
import { BiTrash } from "react-icons/bi"

interface Prop {
    submissions: SubmissionProps[] | undefined
    handleDownload: (
        id: string,
        name: string,
        mode: "submission" | "attachment"
    ) => void
    handleView: (
        id: string,
        name: string,
        mode: "submission" | "attachment"
    ) => void
    handleDelete: (id: string, mode: "submission" | "attachment") => void
}

const AssignmentTable = ({
    submissions,
    handleDownload,
    handleView,
    handleDelete,
}: Prop) => {
    const isEnrolled = useActions((state) => state.isEnrolled)

    return (
        <section>
            {submissions && (
                <Table
                    headers={[
                        "Name",
                        "Size",
                        "Type",
                        "Download",
                        "View",
                        isEnrolled ? "Delete" : "",
                    ]}
                    rows={submissions.map((attachment) => [
                        attachment.filename,
                        `${Math.round(attachment.size / 1000)} KB`,
                        attachment.type,
                        //          download btn
                        <button
                            onClick={() =>
                                handleDownload(
                                    `${attachment.id}.${attachment.type}`,
                                    attachment.filename,
                                    "submission"
                                )
                            }
                            className="text-3xl  w-max mx-auto"
                        >
                            <HiOutlineDocumentDownload />
                        </button>,
                        //  view btn
                        <button
                            onClick={() =>
                                handleView(
                                    `${attachment.id}.${attachment.type}`,
                                    attachment.filename,
                                    "submission"
                                )
                            }
                            className="text-3xl  w-max mx-auto"
                        >
                            <FiEye />
                        </button>,
                        <button
                            onClick={() =>
                                handleDelete(
                                    `${attachment.id}.${attachment.type}`,
                                    "submission"
                                )
                            }
                            className="text-3xl  w-max mx-auto"
                        >
                            <BiTrash />
                        </button>,
                    ])}
                />
            )}
        </section>
    )
}

export default AssignmentTable
