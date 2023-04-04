import { ClickButton, LinkButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import { IoIosAdd } from "react-icons/io"

import React, { ReactNode, useEffect, useRef } from "react"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"

import autoAnimate from "@formkit/auto-animate"
import Announcement from "./Announcement/Announcement"
import useActions from "@store/useActions"
import { shallow } from "zustand/shallow"
import SubmissionTable from "./SubmissionTable"
import Chatroom from "./Chatroom/Chatroom"
import { Socket } from "socket.io-client"

interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined
    toggleAssignmentModal: () => void
    toggleAnnouncementModal: () => void
    classroomId: string | null
    toggleInviteModal: () => void
    socket: Socket
}

const TeacherClassroom = ({
    tab,
    assignments,
    students,
    toggleAssignmentModal,
    toggleAnnouncementModal,
    classroomId,
    toggleInviteModal,
    socket,
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
            <MainTitle title={`${title}`}>
                {/*    Add Assignment - Teacher  */}
                {tab === "assignments" && isOwner && (
                    <ClickButton
                        size={"small"}
                        onClick={toggleAssignmentModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoIosAdd className="text-3xl" />
                            <h1>Add Assignment</h1>
                        </div>
                    </ClickButton>
                )}
                {/*    Invite Student  - Teacher  */}
                {tab === "students" && isOwner && (
                    <ClickButton
                        size={"small"}
                        onClick={toggleInviteModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoIosAdd className="text-3xl" />
                            <h1>Invite Students</h1>
                        </div>
                    </ClickButton>
                )}

                {/*    Add Announcement - Teacher  */}
                {tab === "announcements" && isOwner && (
                    <ClickButton
                        size={"small"}
                        onClick={toggleAnnouncementModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoIosAdd className="text-3xl" />
                            <h1>Add Announcement</h1>
                        </div>
                    </ClickButton>
                )}
            </MainTitle>

            {/*      Assignment Table    */}
            {assignments && tab === "assignments" && (
                <EmptyWrapper
                    data={assignments}
                    noDataText={"No Assignments Found In This Classroom"}
                >
                    <Table
                        headers={[
                            "No",
                            "Name",
                            // "Description",
                            "Due Date",
                            "Action",
                        ]}
                        rows={assignments.map(
                            (assignment, i) =>
                                [
                                    i + 1,
                                    assignment.name,
                                    // assignment.description,
                                    assignment.dueDate,
                                    <span>
                                        <LinkButton
                                            link={`classroom/${classroomId}/assignment/${assignment.id}`}
                                            variant={"secondary"}
                                            size={"small"}
                                        >
                                            <h1>View</h1>
                                        </LinkButton>
                                    </span>,
                                ] as ReactNode[]
                        )}
                    />
                </EmptyWrapper>
            )}

            {/*    Submissions  */}
            {tab === "submissions" && (
                <SubmissionTable assignments={assignments} />
            )}

            {/*     Enrolled Students Table    */}
            {students && tab === "students" && (
                <EmptyWrapper
                    data={students}
                    noDataText={"No Students Enrolled"}
                >
                    <Table
                        headers={["No", "Name", "Action"]}
                        rows={students.map(
                            (student, i) =>
                                [
                                    i + 1,
                                    student.name,
                                    <span>
                                        <LinkButton
                                            link={`/`}
                                            variant={"secondary"}
                                            size={"small"}
                                        >
                                            <h1>View</h1>
                                        </LinkButton>
                                    </span>,
                                ] as ReactNode[]
                        )}
                    />
                </EmptyWrapper>
            )}

            {/*    Announcements  */}

            {tab === "announcements" && (
                <Announcement classroomId={classroomId} />
            )}

            {/* Chat */}
            {tab === "chats" && <Chatroom socket={socket} />}
        </section>
    )
}

export default TeacherClassroom
