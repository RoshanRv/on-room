import AssignmentTable from "@components/Assignment/AssignmentTable"
import { ClickButton } from "@components/Button/Button"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import ConfirmationModal from "@components/Modal/ConfirmationModel"
import FileUploadModel from "@components/Modal/FileUploadModel"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { TiDocumentAdd } from "react-icons/ti"
import { saveAs } from "file-saver"
import SubmissionTable from "@components/Assignment/SubmissionTable"
import useActions from "@store/useActions"
import { shallow } from "zustand/shallow"
import isPresent from "@utils/isPresent"
import useToast from "@store/useToast"
import { formatDate, isPastDueDate } from "@utils/formatDate"
import EditAssignmentForm from "@components/Assignment/EditAssignmentForm"
import { useRouter } from "next/router"

const Assignment = () => {
    const { user } = useUser()
    const { isOn: isEditModal, toggleOn: toggleEditModal } = useToggle()
    const { isOn: isDeleteModal, toggleOn: toggleDeleteModal } = useToggle()
    const { isOn: isFileAttachmentModal, toggleOn: toggleFileAttachmentModal } =
        useToggle()
    const { isOn: isFileSubmissionModal, toggleOn: toggleFileSubmissionModal } =
        useToggle()

    const assignmentId = useSearchParams().get("assignmentId")
    const classroomId = useSearchParams().get("id")
    const [attachmentId, setAttachmentId] = useState<string | null>(null)
    const [attachmentFilename, setAttachmentFilename] = useState<string | null>(
        null
    )
    const [action, setAction] = useState<"download" | "preview" | "">("")
    const [mode, setMode] = useState<"submission" | "attachment" | "">("")
    const router = useRouter()

    //  Fetches Assignment Details
    const { data: assignment } = useQuery({
        queryKey: ["assignment", assignmentId],
        queryFn: async () =>
            await axios.get<AssignmentProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment/${assignmentId}`,
                { withCredentials: true }
            ),
        enabled: !!assignmentId,
    })

    useEffect(() => {
        if (user && assignment) {
            setIsEnrolled(
                user.role,
                isPresent(assignment.data.classroom.student, user.id)
            )
            setIsOwner(user.role, assignment.data.classroom.teacherId, user.id)
        }
    }, [assignment, user])

    const { isEnrolled, isOwner, setIsEnrolled, setIsOwner } = useActions(
        ({ isEnrolled, isOwner, setIsEnrolled, setIsOwner }) => ({
            isEnrolled,
            isOwner,
            setIsEnrolled,
            setIsOwner,
        }),
        shallow
    )

    const setToast = useToast((state) => state.setToast)

    // Fetches A Single File/Attachment By ID
    const { data: attachment, isStale } = useQuery({
        queryKey: ["attachment", attachmentId],
        queryFn: () =>
            axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/${mode}/${attachmentId}`,
                {
                    withCredentials: true,
                    responseType: "blob",
                }
            ),
        enabled: !!attachmentId && !!mode,
        staleTime: Infinity,
        cacheTime: Infinity,

        onSuccess: (attachment) => {
            if (attachment && action == "download") {
                // console.log("downlaod sucess")
                return saveAs(
                    URL.createObjectURL(attachment.data),
                    attachmentFilename!
                )
            } else if (attachment && action == "preview") {
                // console.log("preview success")
                return window.open(URL.createObjectURL(attachment.data))
            }
        },
    })

    const { mutate } = useMutation({
        mutationFn: () =>
            axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment/${assignmentId}`,
                {
                    withCredentials: true,
                }
            ),

        onSuccess: () => {
            router.push(`/classroom/${classroomId}`)
            setToast({
                msg: "Assignment Deleted",
                variant: "success",
            })
        },
    })

    const handleDeleteAssignment = () => {
        mutate()
        toggleDeleteModal()
    }

    const queryClient = useQueryClient()

    const handleDownloadAttachment = async (
        attachmentId: string,
        filename: string,
        fileMode: Exclude<typeof mode, "">
    ) => {
        setAttachmentId(attachmentId)
        setAttachmentFilename(filename)
        setAction("download")
        setMode(fileMode)
        const attachmentBlob: AxiosResponse<any, any> | undefined =
            queryClient.getQueryData(["attachment", attachmentId])

        if (!isStale && attachmentBlob) {
            saveAs(URL.createObjectURL(attachmentBlob.data), filename)
            // console.log("download handle")
        }
    }

    const handleViewAttachment = async (
        attachmentId: string,
        filename: string,
        fileMode: Exclude<typeof mode, "">
    ) => {
        setAttachmentId(attachmentId)
        setAttachmentFilename(filename)
        setAction("preview")
        setMode(fileMode)
        const attachmentBlob: AxiosResponse<any, any> | undefined =
            queryClient.getQueryData(["attachment", attachmentId])

        if (!isStale && attachmentBlob) {
            window.open(URL.createObjectURL(attachmentBlob.data))
            // console.log("preview handle")
        }
    }

    const handleDeleteAttachment = async (
        attachmentId: string,
        fileMode: Exclude<typeof mode, "">
    ) => {
        try {
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/${fileMode}/${attachmentId}`,
                    {
                        withCredentials: true,
                    }
                )
                .then(() => {
                    queryClient.invalidateQueries(["assignment", assignmentId])
                    setToast({
                        msg: `${fileMode} Deleted`,
                        variant: "success",
                    })
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className="flex flex-col gap-y-4 flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*      Title    */}
            <MainTitle backBtn title={`${assignment?.data.name} Assignment`}>
                {/*   Due Date   */}
                {assignment?.data.submissions &&
                assignment?.data.submissions.length > 0 &&
                user?.role === "student" ? (
                    <p className="text-success p-2 rounded-md bg-green-200 border-2 border-success text-xs md:text-base">{`Assignment Submitted`}</p>
                ) : user?.role === "teacher" ? (
                    <p className="text-danger p-2 rounded-md bg-red-200 border-2 border-danger text-xs md:text-base">{`Due Date: ${formatDate(
                        assignment?.data.dueDate
                    )}`}</p>
                ) : (
                    <p className="text-danger p-2 rounded-md bg-red-200 border-2 border-danger  text-xs md:text-base">{`Due Date: ${formatDate(
                        assignment?.data.dueDate
                    )}, ${
                        isPastDueDate(assignment?.data.dueDate) ? "" : ""
                    } `}</p>
                )}
                {/*    Submit Assignment Btn - Student  */}
                {isEnrolled &&
                assignment?.data.submissions &&
                assignment?.data.submissions.length === 0 ? (
                    <ClickButton
                        size={"logo"}
                        variant={"secondary"}
                        onClick={toggleFileSubmissionModal}
                        disabled={isPastDueDate(assignment?.data.dueDate)}
                    >
                        <div className="flex items-center gap-x-2">
                            <TiDocumentAdd className="text-3xl" />
                            <h1 className="hidden lg:block">
                                Submit Assignment
                            </h1>
                        </div>
                    </ClickButton>
                ) : (
                    // Add/Edit/Delete Attachments  Btns- Teachers
                    isOwner && (
                        <div className="flex gap-x-4 items-center">
                            <ClickButton
                                size={"logo"}
                                variant={"primary"}
                                onClick={toggleFileAttachmentModal}
                            >
                                <div className="flex items-center gap-x-2    ">
                                    <TiDocumentAdd className="text-3xl" />
                                    <h1 className="hidden lg:block">
                                        Add Assignment
                                    </h1>
                                </div>
                            </ClickButton>
                            <ClickButton
                                size={"logo"}
                                variant={"secondary"}
                                onClick={toggleEditModal}
                            >
                                <div className="flex items-center gap-x-2">
                                    <HiOutlinePencilAlt className="text-2xl" />
                                    <h1 className="hidden lg:block">Edit</h1>
                                </div>
                            </ClickButton>
                            <ClickButton
                                size={"logo"}
                                variant={"danger"}
                                onClick={toggleDeleteModal}
                            >
                                <div className="flex items-center gap-x-2">
                                    <FiTrash2 className="text-2xl" />
                                    <h1 className="hidden lg:block">Delete</h1>
                                </div>
                            </ClickButton>
                        </div>
                    )
                )}
            </MainTitle>

            {/*   Description   */}
            <p className="text-gray-800 dark:text-gray-300 mb-10">
                {assignment?.data.description}
            </p>
            <h1 className="text-2xl text-dPri md:text-3xl font-semibold ">
                Assignment Files
            </h1>
            {/*      Attachments  - All   */}
            <EmptyWrapper
                data={assignment?.data.attachments}
                noDataText="No Assignemnts To Show"
            >
                <AssignmentTable
                    attachments={assignment?.data.attachments}
                    handleDownload={handleDownloadAttachment}
                    handleView={handleViewAttachment}
                    handleDelete={handleDeleteAttachment}
                />
            </EmptyWrapper>

            {/*      Submissions  - Students  */}
            {isEnrolled && (
                <>
                    <h1 className="text-2xl text-dPri md:text-3xl font-semibold ">
                        Your Submission
                    </h1>
                    <EmptyWrapper
                        data={assignment?.data.submissions}
                        noDataText="You Have Not Submmited This Assignment"
                    >
                        <SubmissionTable
                            submissions={assignment?.data.submissions}
                            handleDownload={handleDownloadAttachment}
                            handleView={handleViewAttachment}
                            handleDelete={handleDeleteAttachment}
                        />
                    </EmptyWrapper>
                </>
            )}

            {/*   Attachment File Upload Model   */}
            <Modal
                isOn={isFileAttachmentModal}
                toggleOn={toggleFileAttachmentModal}
            >
                <FileUploadModel
                    toggleModal={toggleFileAttachmentModal}
                    type={"attachment"}
                />
            </Modal>
            {/*   Attachment File Upload Model   */}
            <Modal
                isOn={isFileSubmissionModal}
                toggleOn={toggleFileSubmissionModal}
            >
                <FileUploadModel
                    toggleModal={toggleFileSubmissionModal}
                    type={"submission"}
                />
            </Modal>

            {/*      Edit Classroom Modal    */}
            <Modal isOn={isEditModal} toggleOn={toggleEditModal}>
                <EditAssignmentForm toggleOn={toggleEditModal} />
            </Modal>
            {/* < /> */}

            {/*   Delete Confirmation Modal  */}
            <Modal isOn={isDeleteModal} toggleOn={toggleDeleteModal}>
                <ConfirmationModal
                    action="delete"
                    name={assignment?.data.name}
                    type={"assignment"}
                    toggleConfirmationModal={toggleDeleteModal}
                    handleAction={handleDeleteAssignment}
                />
            </Modal>
        </main>
    )
}

export default Assignment
