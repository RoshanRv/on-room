import { ClickButton } from "@components/Button/Button"
import RemoveModal from "@components/Classroom/Delete/RemoveModal"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import ConfirmationModal from "@components/Modal/ConfirmationModel"
import FileUploadModel from "@components/Modal/FileUploadModel"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React from "react"
import { FiTrash2 } from "react-icons/fi"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { IoIosAdd } from "react-icons/io"

const Assignment = () => {
    const { userRole } = useUser()
    const { isOn: isEditModal, toggleOn: toggleEditModal } = useToggle()
    const { isOn: isDeleteModal, toggleOn: toggleDeleteModal } = useToggle()
    const { isOn: isFileModal, toggleOn: toggleFileModal } = useToggle()

    const assignmentId = useSearchParams().get("assignmentId")
    const { data: assignment } = useQuery({
        queryKey: ["assignment", assignmentId],
        queryFn: () =>
            axios.get<AssignmentProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment/${assignmentId}`,
                { withCredentials: true }
            ),
    })

    const handleDeleteAssignment = () => {}

    return (
        <main className="flex flex-col gap-y-4 flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*      Title and Btns    */}
            <MainTitle title={`${assignment?.data.name} Assignment`}>
                {/*   Due Date   */}
                <p className="text-danger p-2 rounded-md bg-red-200 border-2 border-danger ">{`Due Date: ${assignment?.data.dueDate}`}</p>
                {userRole === "student" ? (
                    <ClickButton
                        size={"small"}
                        variant={"secondary"}
                        onClick={toggleFileModal}
                    >
                        <div className="flex items-center gap-x-2">
                            <IoIosAdd className="text-3xl" />
                            <h1>Submit Assignment</h1>
                        </div>
                    </ClickButton>
                ) : (
                    <div className="flex gap-x-4 items-center">
                        <ClickButton
                            size={"small"}
                            variant={"primary"}
                            onClick={toggleFileModal}
                        >
                            <div className="flex items-center gap-x-2">
                                <IoIosAdd className="text-3xl" />
                                <h1>Add Assignment</h1>
                            </div>
                        </ClickButton>
                        <ClickButton
                            size={"small"}
                            variant={"secondary"}
                            onClick={toggleEditModal}
                        >
                            <div className="flex items-center gap-x-2">
                                <HiOutlinePencilAlt className="text-2xl" />
                                <h1>Edit</h1>
                            </div>
                        </ClickButton>
                        <ClickButton
                            size={"small"}
                            variant={"danger"}
                            onClick={toggleDeleteModal}
                        >
                            <div className="flex items-center gap-x-2">
                                <FiTrash2 className="text-2xl" />
                                <h1>Delete</h1>
                            </div>
                        </ClickButton>
                    </div>
                )}
            </MainTitle>

            <EmptyWrapper data={[]} noDataText="No Assignemnts To Show">
                <h1></h1>
            </EmptyWrapper>

            {/*   File Upload Model   */}
            <Modal isOn={isFileModal} toggleOn={toggleFileModal}>
                <FileUploadModel />
            </Modal>

            {/*      Edit Classroom Modal    */}
            <Modal isOn={isEditModal} toggleOn={toggleEditModal}>
                <></>
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
