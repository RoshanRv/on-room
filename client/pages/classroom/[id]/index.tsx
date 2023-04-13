import dynamic from "next/dynamic"

import { ClickButton } from "@components/Button/Button"
import Tabs from "@components/Classroom/Tabs"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { FiTrash2 } from "react-icons/fi"
import isPresent from "@utils/isPresent"
import useActions from "@store/useActions"
import Spinner from "@components/Spinner"
// import EditClassroomForm from "@components/Classroom/EditClassroomForm"

const TeacherClassroom = dynamic(
    () => import("@components/Classroom/TeacherClassroom"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const StudentClassroom = dynamic(
    () => import("@components/Classroom/StudentClassroom"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const InviteStudents = dynamic(
    () => import("@components/Classroom/InviteStudents"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const AddAnnouncementForm = dynamic(
    () => import("@components/Classroom/AddAnnouncementForm"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const ConfirmationModal = dynamic(
    () => import("@components/Modal/ConfirmationModel"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const AddAssignmentForm = dynamic(
    () => import("@components/Classroom/AddAssignmentForm"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)
const EditClassroomForm = dynamic(
    () => import("@components/Classroom/EditClassroomForm"),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)

const Classroom = () => {
    const router = useRouter()
    const id = useSearchParams().get("id")
    const { userRole, user } = useUser()
    const { data: classroom } = useQuery({
        queryKey: ["classroom", id],
        queryFn: () =>
            axios.get<ClassroomProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/${id}`,
                { withCredentials: true }
            ),
        enabled: !!id,
    })

    useEffect(() => {
        if (user && classroom) {
            setIsEnrolled(user.role, isPresent(classroom.data.student, user.id))
            setIsOwner(user.role, classroom.data.teacherId, user.id)
        }
    }, [classroom, user])

    const {
        isEnrolled,
        isNotEnrolled,
        isNotOwner,
        isOwner,
        setIsEnrolled,
        setIsOwner,
    } = useActions()

    const { isOn: isEditModal, toggleOn: toggleEditModal } = useToggle()
    const { isOn: isDeleteModal, toggleOn: toggleDeleteModal } = useToggle()
    const { isOn: isUnEnrollModal, toggleOn: toggleUnEnrollModal } = useToggle()
    const { isOn: isAssignmentModal, toggleOn: toggleAssignmentModal } =
        useToggle()
    const { isOn: isAnnouncementModal, toggleOn: toggleAnnouncementModal } =
        useToggle()
    const { isOn: isInviteModal, toggleOn: toggleInviteModal } = useToggle()

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
        toggleUnEnrollModal()
    }

    return (
        <main className="flex flex-col gap-y-4 flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*      Title    */}
            <MainTitle backBtn title={`${classroom?.data.title} Classroom`}>
                {/*    Enroll/Unenroll Btn - Students  */}
                {isEnrolled ? (
                    <ClickButton
                        size={"small"}
                        variant={"danger"}
                        onClick={toggleUnEnrollModal}
                    >
                        <h1 className="">UnEnroll</h1>
                    </ClickButton>
                ) : (
                    isNotEnrolled && (
                        <ClickButton
                            size={"small"}
                            variant={"primary"}
                            onClick={() => null}
                        >
                            <h1 className="">Enroll</h1>
                        </ClickButton>
                    )
                )}
                {/*   Add/Delete/Edit Btn - Teachers   */}
                {isOwner && (
                    <div className="flex gap-x-4 items-center">
                        <ClickButton
                            size={"logo"}
                            variant={"secondary"}
                            onClick={toggleEditModal}
                        >
                            <div className="flex items-center gap-x-2">
                                <HiOutlinePencilAlt className="text-2xl" />
                                <h1 className="hidden md:block">Edit</h1>
                            </div>
                        </ClickButton>
                        <ClickButton
                            size={"logo"}
                            variant={"danger"}
                            onClick={toggleDeleteModal}
                        >
                            <div className="flex items-center gap-x-2">
                                <FiTrash2 className="text-2xl" />
                                <h1 className="hidden md:block">Delete</h1>
                            </div>
                        </ClickButton>
                    </div>
                )}
            </MainTitle>

            {/*      Description    */}
            <p className="dark:text-gray-300 text-gray-800">
                {classroom?.data.description}
            </p>

            <section className="flex mt-10 p-2 gap-x-4 md:gap-x-10 h-full  flex-1  ">
                {/*      Tabs    */}
                <Tabs tab={tab} setTab={setTab} />

                {/*     Assignments/Students Table     */}
                <section className="w-full  flex flex-col ">
                    {userRole == "teacher" ? (
                        <TeacherClassroom
                            assignments={classroom?.data.assignments}
                            students={classroom?.data.student}
                            tab={tab}
                            classroomId={id}
                            toggleAssignmentModal={toggleAssignmentModal}
                            toggleAnnouncementModal={toggleAnnouncementModal}
                            toggleInviteModal={toggleInviteModal}
                        />
                    ) : (
                        userRole === "student" && (
                            <StudentClassroom
                                students={classroom?.data.student}
                                classroomId={id}
                                assignments={classroom?.data.assignments}
                                tab={tab}
                                toggleInviteModal={toggleInviteModal}
                            />
                        )
                    )}
                </section>
            </section>

            {/*      Edit Classroom Modal    */}
            {isEditModal && (
                <Modal isOn={isEditModal} toggleOn={toggleEditModal}>
                    <EditClassroomForm
                        classroom={classroom?.data}
                        toggleOn={toggleEditModal}
                    />
                </Modal>
            )}
            {/* < /> */}

            {/*      Add Assignment Modal    */}
            {isAssignmentModal && (
                <Modal
                    isOn={isAssignmentModal}
                    toggleOn={toggleAssignmentModal}
                >
                    <AddAssignmentForm
                        toggleOn={toggleAssignmentModal}
                        classroomId={classroom?.data.id!}
                    />
                </Modal>
            )}
            {/* < /> */}

            {/*      Add Announcement Modal    */}
            {isAnnouncementModal && (
                <Modal
                    isOn={isAnnouncementModal}
                    toggleOn={toggleAnnouncementModal}
                >
                    <AddAnnouncementForm
                        toggleOn={toggleAnnouncementModal}
                        classroomId={classroom?.data.id!}
                    />
                </Modal>
            )}
            {/* < /> */}

            {/*   Delete Confirmation Modal  */}
            {isDeleteModal && (
                <Modal isOn={isDeleteModal} toggleOn={toggleDeleteModal}>
                    <ConfirmationModal
                        name={classroom?.data.title}
                        handleAction={handleDeleteClassroom}
                        toggleConfirmationModal={toggleDeleteModal}
                        action={"delete"}
                        type={"course"}
                    />
                </Modal>
            )}

            {/*   Unenroll Confirmation Modal  */}
            {isUnEnrollModal && (
                <Modal isOn={isUnEnrollModal} toggleOn={toggleUnEnrollModal}>
                    <ConfirmationModal
                        name={classroom?.data.title}
                        handleAction={handelUnEnroll}
                        toggleConfirmationModal={toggleUnEnrollModal}
                        action={"unenroll"}
                        type={"course"}
                    />
                </Modal>
            )}

            {/*     Invite Students Modal  */}
            {isInviteModal && (
                <Modal isOn={isInviteModal} toggleOn={toggleInviteModal}>
                    <InviteStudents
                        toggleOn={toggleInviteModal}
                        classroomId={classroom?.data.id!}
                        classroomName={classroom?.data.title}
                    />
                </Modal>
            )}
        </main>
    )
}

export default Classroom
