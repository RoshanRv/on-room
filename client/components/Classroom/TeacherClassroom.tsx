import { ClickButton, LinkButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import { IoMdAdd } from "react-icons/io"
import React, { useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"
import useActions from "@store/useActions"
import { shallow } from "zustand/shallow"
import dynamic from "next/dynamic"

const Announcement = dynamic(
    () => import("@components/Classroom/Announcement/Announcement")
)
const EnrolledTable = dynamic(
    () => import("@components/Classroom/Teacher/EnrolledTable")
)
const SubmissionTable = dynamic(
    () => import("@components/Classroom/Teacher/SubmissionTable")
)
const AssignmentTable = dynamic(
    () => import("@components/Classroom/Teacher/AssignmentTable")
)
const Chatroom = dynamic(
    () => import("@components/Classroom/Chatroom/Chatroom")
)

interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined
    toggleAssignmentModal: () => void
    toggleAnnouncementModal: () => void
    classroomId: string | null
    toggleInviteModal: () => void
}

const TeacherClassroom = ({
    tab,
    assignments,
    students,
    toggleAssignmentModal,
    toggleAnnouncementModal,
    classroomId,
    toggleInviteModal,
}: Props) => {
    const parent = useRef(null)
    const { isOwner } = useActions(
        ({ isOwner }) => ({
            isOwner,
        }),
        shallow
    )

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    let title
    switch (tab) {
        case "assignments":
            title = "Your Assignments"
            break
        case "submissions":
            title = "Submitted Assignments"
            break
        case "students":
            title = "Enrolled Students"
            break
        case "announcements":
            title = "Announcements"
            break
        case "chats":
            title = "Chatroom"
            break
    }

    return (
        <section className="flex flex-col h-full" ref={parent}>
            {/*    heading  */}
            <MainTitle sub title={`${title}`}>
                {/*    Add Assignment - Teacher  */}
                {tab === "assignments" && isOwner && (
                    <ClickButton
                        size={"logo"}
                        onClick={toggleAssignmentModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoMdAdd className="text-3xl" />
                            <h1 className="hidden md:block">Add Assignment</h1>
                        </div>
                    </ClickButton>
                )}
                {/*    Invite Student  - Teacher  */}
                {tab === "students" && isOwner && (
                    <ClickButton
                        size={"logo"}
                        onClick={toggleInviteModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoMdAdd className="text-3xl" />
                            <h1 className="hidden md:block">Invite Students</h1>
                        </div>
                    </ClickButton>
                )}

                {/*    Add Announcement - Teacher  */}
                {tab === "announcements" && isOwner && (
                    <ClickButton
                        size={"logo"}
                        onClick={toggleAnnouncementModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoMdAdd className="text-3xl" />
                            <h1 className="hidden md:block">
                                Add Announcement
                            </h1>
                        </div>
                    </ClickButton>
                )}
            </MainTitle>
            {/* --- End Title   ------- */}

            {/*      Assignment Table    */}
            {assignments && tab === "assignments" && (
                <AssignmentTable
                    assignments={assignments}
                    classroomId={classroomId}
                />
            )}

            {/*    Submissions  */}
            {tab === "submissions" && (
                <SubmissionTable assignments={assignments} />
            )}

            {/*     Enrolled Students Table    */}
            {students && tab === "students" && (
                <EnrolledTable students={students} />
            )}

            {/*    Announcements  */}

            {tab === "announcements" && (
                <Announcement classroomId={classroomId} />
            )}

            {/* Chat */}
            {tab === "chats" && <Chatroom />}
        </section>
    )
}

export default TeacherClassroom
