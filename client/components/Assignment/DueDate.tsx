import { formatDate, isPastDueDate } from "@utils/formatDate"
import React from "react"

type Props = {
    assignment: AssignmentProps | undefined
    user: UserProps | undefined
}

const DueDate = ({ assignment, user }: Props) => {
    return (
        <>
            {assignment &&
            assignment?.submissions &&
            assignment?.submissions.length > 0 &&
            user?.role === "student" ? (
                <p className="text-success p-2 rounded-md bg-green-200 border-2 border-success text-xs md:text-base">{`Assignment Submitted`}</p>
            ) : user?.role === "teacher" ? (
                <p className="text-danger p-2 rounded-md bg-red-200 border-2 border-danger text-xs md:text-base">{`Due Date: ${formatDate(
                    assignment?.dueDate
                )}`}</p>
            ) : (
                <p className="text-danger p-2 rounded-md bg-red-200 border-2 border-danger  text-xs md:text-base">{`Due Date: ${formatDate(
                    assignment?.dueDate
                )}, ${isPastDueDate(assignment?.dueDate) ? "" : ""} `}</p>
            )}
        </>
    )
}

export default DueDate
