import { ClickButton } from "@components/Button/Button"
import Table from "@components/Table/Table"
import MainTitle from "@components/Title/MainTitle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import validateFile from "@utils/validateFile"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { ChangeEvent, DragEvent, useState } from "react"
import { AiOutlineFileAdd } from "react-icons/ai"
import { FiTrash2 } from "react-icons/fi"

interface Props {
    toggleModal: () => void
    type: "attachment" | "submission"
}

const FileUploadModel = ({ toggleModal, type }: Props) => {
    const [isDragActive, setDragActive] = useState(false)
    const [attachments, setAttachments] = useState<FileProps[]>([])
    const [fileData, setFileData] = useState<File[]>()

    const assignmentId = useSearchParams().get("assignmentId")
    const queryClient = useQueryClient()

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Eliminates Invalid Typed & Duplicate Files

            const files = validateFile(
                Array.from(e.dataTransfer.files),
                attachments
            )
            files.forEach((file) => {
                setAttachments((e) => [
                    ...e,
                    { filename: file.name, size: file.size, type: file.type },
                ])
            })
            setFileData(files)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target.files && e.target.files[0]) {
            // Eliminates Invalid Typed & Duplicate Files

            const files = validateFile(Array.from(e.target.files), attachments)

            files.forEach((file) => {
                setAttachments((e) => [
                    ...e,
                    {
                        filename: file.name,
                        size: file.size,
                        type: file.name.split(".")[1],
                    },
                ])
            })
            setFileData(files)
        }
    }

    const handleRemoveFile = (filename: string) => {
        setAttachments((e) => e.filter((file) => file.filename != filename))
        setFileData((e) => e?.filter((file) => file.name != filename))
    }

    const handleUpload = () => {
        const formData = new FormData()
        fileData?.forEach((file) => formData.append(file.name, file))
        try {
            if (fileData && fileData?.length > 0) {
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/${type}/assignment/${assignmentId}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            withCredentials: true,
                        }
                    )
                    .then((resp) =>
                        queryClient.invalidateQueries(["assignment"])
                    )
            }
            setAttachments([])
            setFileData([])
            toggleModal()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className="flex flex-col gap-y-4 p-2   ">
            <MainTitle title="Upload File" />
            {/*   File Upload Space   */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dPri border-dashed py-16 px-10 rounded-md w-full  items-center justify-center flex flex-col gap-y-6  ${
                    isDragActive ? "bg-dPri/40" : "bg-transparent"
                }`}
            >
                {/*     Upload File/ File Table     */}
                {attachments.length <= 0 ? (
                    <div>
                        <AiOutlineFileAdd className="text-6xl opacity-70" />
                    </div>
                ) : (
                    <div>
                        <Table
                            headers={["name", "size", "type", "action"]}
                            rows={attachments.map((file) => [
                                file.filename,
                                `${Math.round(file.size / 1000)} KB`,
                                file.type,
                                <button
                                    onClick={() =>
                                        handleRemoveFile(file.filename)
                                    }
                                >
                                    <FiTrash2 className="text-lg" />
                                </button>,
                            ])}
                        ></Table>
                    </div>
                )}
                <div className="relative cursor-pointer w-max mx-auto text-center">
                    <input
                        type="file"
                        multiple
                        className=" opacity-0 cursor-pointer w-max"
                        onChange={handleChange}
                    />
                    <p className="absolute top-0 -z-10 dark:text-gray-400 text-gray-500 cursor-pointer left-1/2 -translate-x-1/2  ">
                        Click To Upload
                    </p>
                </div>
            </div>
            <ClickButton
                onClick={handleUpload}
                size={"small"}
                variant={"secondary"}
            >
                <h1>Upload Files</h1>
            </ClickButton>
        </section>
    )
}

export default FileUploadModel
