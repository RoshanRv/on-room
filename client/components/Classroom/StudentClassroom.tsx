import { LinkButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import React, { ReactNode } from "react"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import Announcement from "./Announcement/Announcement"

interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined

    classroomId: string | null
}

const StudentClassroom = ({
    tab,
    assignments,
    classroomId,
    students,
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
    }

    return (
        <>
            {/*    heading  */}
            <MainTitle title={`${title}`}></MainTitle>
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
                                    "N/A",
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

            {tab === "announcements" && (
                <Announcement classroomId={classroomId} />
            )}
        </>
    )
}

export default StudentClassroom
