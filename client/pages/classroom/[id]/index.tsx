import { ClickButton } from "@components/Button/Button"
import EditClassroomForm from "@components/Classroom/EditClassroomForm"
import Tabs from "@components/Classroom/Tabs"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import React, { ReactNode, useState } from "react"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { FiTrash2 } from "react-icons/fi"
import AddAssignmentForm from "@components/Classroom/AddAssignmentForm"
import Table from "@components/Table/Table"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import TeacherClassroom from "@components/Classroom/TeacherClassroom"
import StudentClassroom from "@components/Classroom/StudentClassroom"
import ConfirmationModal from "@components/Modal/ConfirmationModel"
import AddAnnouncementForm from "@components/Classroom/AddAnnouncementForm"

const Classroom = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const { userRole } = useUser()
    const { data: classroom } = useQuery({
        queryKey: ["classroom", id],
        queryFn: () =>
            axios.get<ClassroomProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/${id}`,
                { withCredentials: true }
            ),
    })
    const { data: assignments } = useQuery({
        queryKey: ["assignment"],
        queryFn: () =>
            axios.get<AssignmentProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment/classroom/${id}`,
                { withCredentials: true }
            ),
    })

    const { data: students } = useQuery({
        queryKey: ["students"],
        queryFn: () =>
            axios.get<StudentProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/enrolled/${id}`,
                { withCredentials: true }
            ),
    })

    const { isOn: isEditModal, toggleOn: toggleEditModal } = useToggle()
    const { isOn: isDeleteModal, toggleOn: toggleDeleteModal } = useToggle()
    const { isOn: isUnEnrollModal, toggleOn: toggleUnEnrollModal } = useToggle()
    const { isOn: isAssignmentModal, toggleOn: toggleAssignmentModal } =
        useToggle()
    const { isOn: isAnnouncementModal, toggleOn: toggleAnnouncementModal } =
        useToggle()

    const [tab, setTab] = useState<Tabs>("assignments")

    const { mutate: invokeDeleteClassroom } = useMutation({
        mutationFn: () =>
            axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/${classroom?.data.id}`,
                { withCredentials: true }
            ),
    })

    const { mutate: unEnrollClassroom } = useMutation({
        mutationFn: () =>
            axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/unenroll`,
                { id },
                { withCredentials: true }
            ),
    })

    const handleDeleteClassroom = () => {
        invokeDeleteClassroom()
        toggleDeleteModal()
        router.push("/dashboard")
    }

    const handelUnEnroll = () => {
        unEnrollClassroom()
        toggleDeleteModal()
    }

    return (
        <main className="flex flex-col gap-y-4 flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*      Title and Unenroll/Edit btn    */}
            <MainTitle title={`${classroom?.data.title} Classroom`}>
                {userRole === "student" ? (
                    <ClickButton
                        size={"small"}
                        variant={"danger"}
                        onClick={toggleUnEnrollModal}
                    >
                        <h1>UnEnroll</h1>
                    </ClickButton>
                ) : (
                    <div className="flex gap-x-4 items-center">
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

            {/*      Description    */}
            <p className="dark:text-gray-300 text-gray-800">
                {classroom?.data.description}
            </p>

            <section className="flex mt-10 p-2 gap-x-10">
                {/*      Tabs    */}
                <Tabs tab={tab} setTab={setTab} />

                {/*     Assignments/Students Table     */}
                <section className="w-full">
                    {userRole == "teacher" ? (
                        <TeacherClassroom
                            assignments={assignments?.data}
                            students={students?.data}
                            tab={tab}
                            classroomId={id}
                            toggleAssignmentModal={toggleAssignmentModal}
                            toggleAnnouncementModal={toggleAnnouncementModal}
                        />
                    ) : (
                        <StudentClassroom
                            students={students?.data}
                            classroomId={id}
                            assignments={assignments?.data}
                            tab={tab}
                        />
                    )}
                </section>
            </section>

            {/*      Edit Classroom Modal    */}
            <Modal isOn={isEditModal} toggleOn={toggleEditModal}>
                <EditClassroomForm toggleOn={toggleEditModal} />
            </Modal>
            {/* < /> */}

            {/*      Add Assignment Modal    */}
            <Modal isOn={isAssignmentModal} toggleOn={toggleAssignmentModal}>
                <AddAssignmentForm
                    toggleOn={toggleAssignmentModal}
                    classroomId={classroom?.data.id!}
                />
            </Modal>
            {/* < /> */}

            {/*      Add Announcement Modal    */}
            <Modal
                isOn={isAnnouncementModal}
                toggleOn={toggleAnnouncementModal}
            >
                <AddAnnouncementForm
                    toggleOn={toggleAnnouncementModal}
                    classroomId={classroom?.data.id!}
                />
            </Modal>
            {/* < /> */}

            {/*   Delete Confirmation Modal  */}
            <Modal isOn={isDeleteModal} toggleOn={toggleDeleteModal}>
                <ConfirmationModal
                    name={classroom?.data.title}
                    handleAction={handleDeleteClassroom}
                    toggleConfirmationModal={toggleDeleteModal}
                    action={"delete"}
                    type={"course"}
                />
            </Modal>

            {/*   Unenroll Confirmation Modal  */}
            <Modal isOn={isUnEnrollModal} toggleOn={toggleUnEnrollModal}>
                <ConfirmationModal
                    name={classroom?.data.title}
                    handleAction={handelUnEnroll}
                    toggleConfirmationModal={toggleUnEnrollModal}
                    action={"unenroll"}
                    type={"course"}
                />
            </Modal>
        </main>
    )
}

export default Classroom
