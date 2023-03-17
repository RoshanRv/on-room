import Table from "@components/Table/Table"
import React from "react"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import { FiEye } from "react-icons/fi"
import useActions from "@store/useActions"
import { shallow } from "zustand/shallow"

interface Prop {
    attachments: Attachment[] | undefined
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
    attachments,
    handleDownload,
    handleView,
    handleDelete,
}: Prop) => {
    const isOwner = useActions((state) => state.isOwner)

    return (
        <section>
            {attachments && (
                <Table
                    headers={[
                        "Name",
                        "Size",
                        "Type",
                        "Download",
                        "View",
                        isOwner ? "Delete" : "",
                    ]}
                    rows={attachments.map((attachment) => [
                        attachment.filename,
                        `${Math.round(attachment.size / 1000)} KB`,
                        attachment.type,

                        <button
                            onClick={() =>
                                handleDownload(
                                    `${attachment.id}.${attachment.type}`,
                                    attachment.filename,
                                    "attachment"
                                )
                            }
                            className="text-3xl  w-max mx-auto"
                        >
                            <HiOutlineDocumentDownload />
                        </button>,

                        <button
                            onClick={() =>
                                handleDelete(
                                    `${attachment.id}.${attachment.type}`,
                                    "attachment"
                                )
                            }
                            className="text-3xl  w-max mx-auto"
                        >
                            <FiEye />
                        </button>,
                    ])}
                />
            )}
        </section>
    )
}

export default AssignmentTable
