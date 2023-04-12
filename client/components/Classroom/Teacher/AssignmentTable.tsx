import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import Link from "next/link"
import React, { ReactNode } from "react"
import { FiEye } from "react-icons/fi"

interface Props {
    assignments: AssignmentProps[]
    classroomId: string | null
}

const AssignmentTable = ({ assignments, classroomId }: Props) => {
    return (
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
