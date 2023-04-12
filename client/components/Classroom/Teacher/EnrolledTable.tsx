import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import Link from "next/link"
import React, { ReactNode } from "react"
import { FiEye } from "react-icons/fi"

type Props = {
    students: StudentProps[]
}

const EnrolledTable = ({ students }: Props) => {
    return (
        <EmptyWrapper data={students} noDataText={"No Students Enrolled"}>
            <Table
                headers={["No", "Name", "Action"]}
                rows={students.map(
                    (student, i) =>
                        [
                            i + 1,
                            student.name,

                            <Link href={`/`}>
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

export default EnrolledTable
