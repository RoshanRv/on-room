import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import Link from "next/link"
import React, { ReactNode } from "react"
import { FiEye } from "react-icons/fi"

interface Props {
    assignments: AssignmentProps[]
    classroomId: string | null
    submissions: SubmissionStudentsProps[] | undefined
    user: UserProps | undefined
}

const AssignmentTable = ({
    assignments,
    classroomId,
    submissions,
    user,
}: Props) => {
    const findGrade = (assignmentId: string) => {
        let grade: string | number = "N/A"

        if (submissions && user) {
            for (let submission of submissions) {
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
                            <Link
                                href={`/classroom/${classroomId}/assignment/${assignment.id}`}
                            >
                                <button className="text-2xl">
                                    <FiEye />
                                </button>
                            </Link>,
                        ] as ReactNode[]
                )}
            />
        </EmptyWrapper>
    )
}

export default AssignmentTable
