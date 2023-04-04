import { ClickButton, LinkButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import React, { ReactNode } from "react"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import Announcement from "./Announcement/Announcement"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useUser from "@hooks/useUser"
import { IoIosAdd } from "react-icons/io"
import Chatroom from "./Chatroom/Chatroom"
import { Socket } from "socket.io-client"

interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined
    classroomId: string | null
    toggleInviteModal: () => void
    socket: Socket
}

const StudentClassroom = ({
    tab,
    assignments,
    classroomId,
    students,
    toggleInviteModal,
    socket,
}: Props) => {
    let title
    switch (tab) {
        case "assignments":
            title = "Your Assignments"
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

    const { data: submissions } = useQuery({
        queryFn: () =>
            axios.get<SubmissionStudentsProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/submission/classroom/${classroomId}`,
                { withCredentials: true }
            ),
        queryKey: ["submission", classroomId],
    })

    const { user } = useUser()

    const findGrade = (assignmentId: string) => {
        let grade: string | number = "N/A"

        if (submissions && user) {
            for (let submission of submissions.data) {
                if (
                    submission.assignmentId === assignmentId &&
                    submission.studentId === user.id
                ) {
                    grade = submission.grade ? submission.grade : "N/A"
                    break
                } else {
                    grade = "N/A"
                }
            }
        }

        return grade
    }

    return (
        <>
            {/*    heading  */}
            <MainTitle title={`${title}`}>
                {/*    Invite Student  - Student  */}
                {tab === "students" && (
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
            </MainTitle>
            {/*      Assignment Table    */}
            {assignments && tab === "assignments" && (
                <EmptyWrapper
                    data={assignments}
                    noDataText={"No Assignments Found In This Classroom"}
                >
                    <Table
                        headers={["No", "Name", "Grade", "Due Date", "Action"]}
                        rows={assignments.map(
                            (assignment, i) =>
                                [
                                    i + 1,
                                    assignment.name,
                                    findGrade(assignment.id),
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

            {/*     Enrolled Students Table    */}
            {students && tab === "students" && (
                <EmptyWrapper
                    data={students}
                    noDataText={"No Students Enrolled"}
                >
                    <Table
                        headers={[
                            "No",
                            "Name",
                            // "Description",
                            // "Due Date",
                            "Action",
                        ]}
                        rows={students.map(
                            (student, i) =>
                                [
                                    i + 1,
                                    student.name,
                                    // student.,
                                    <span>
                                        <LinkButton
                                            link={``}
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
        </>
    )
}

export default StudentClassroom
