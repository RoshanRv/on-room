import { ClickButton, LinkButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import { IoIosAdd } from "react-icons/io"

import React, { ReactNode, useEffect, useRef } from "react"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"

import autoAnimate from "@formkit/auto-animate"
import Announcement from "./Announcement/Announcement"

interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined
    toggleAssignmentModal: () => void
    toggleAnnouncementModal: () => void
    classroomId: string | null
}

const TeacherClassroom = ({
    tab,
    assignments,
    students,
    toggleAssignmentModal,
    toggleAnnouncementModal,
    classroomId,
}: Props) => {
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

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
    }

    return (
        <section ref={parent}>
            {/*    heading  */}
            <MainTitle title={`${title}`}>
                {tab === "assignments" && (
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

                {tab === "announcements" && (
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
            {/* <div className="" ref={parent}> */}{" "}
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
                                            <h1>Edit</h1>
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
            {tab === "announcements" && (
                <Announcement classroomId={classroomId} />
            )}
            {/* </div> */}
        </section>
    )
}

export default TeacherClassroom
