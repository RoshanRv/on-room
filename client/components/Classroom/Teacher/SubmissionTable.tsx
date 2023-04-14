import { LinkButton } from "@components/Button/Button"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import Table from "@components/Table/Table"
import useToast from "@store/useToast"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useSearchParams } from "next/navigation"
import React, { ReactNode, useEffect, useState } from "react"
import { FiEye } from "react-icons/fi"
import { MdDone, MdEdit } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"

const SubmissionTable = ({
    assignments,
}: {
    assignments: AssignmentProps[] | undefined
}) => {
    const classroomId = useSearchParams().get("id")

    const { data: submissions } = useQuery({
        queryFn: () =>
            axios.get<SubmissionStudentsProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/submission/classroom/${classroomId}`,
                { withCredentials: true }
            ),
        queryKey: ["submission", classroomId],
    })

    const [submissionId, setSubmissionId] = useState<string | null>(null)
    const [submissionGrade, setSubmissionGrade] = useState<number>(0)
    const [assignmentList, setAssignmentList] = useState<string[]>([])

    useEffect(() => {
        if (assignments) {
            setAssignmentList(assignments.map((assignment) => assignment.name))
        }
    }, [assignments])

    // Fetches A Single File/Attachment By ID
    const { data: attachment, isStale } = useQuery({
        queryKey: ["attachment", submissionId],
        queryFn: () =>
            axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/submission/${submissionId}`,
                {
                    withCredentials: true,
                    responseType: "blob",
                }
            ),
        enabled: !!submissionId,
        staleTime: Infinity,
        cacheTime: Infinity,

        onSuccess: (attachment) => {
            if (attachment) {
                return window.open(URL.createObjectURL(attachment.data))
            }
        },
    })

    const queryClient = useQueryClient()

    const handleViewAttachment = async (attachmentId: string) => {
        setSubmissionId(attachmentId)
        const attachmentBlob: AxiosResponse<any, any> | undefined =
            queryClient.getQueryData(["attachment", attachmentId])

        if (!isStale && attachmentBlob) {
            window.open(URL.createObjectURL(attachmentBlob.data))
        }
    }

    const [isEditable, setIsEditable] = useState<null | string>(null)
    const [filterVal, setFilterVal] = useState<string>("")
    const [filteredSubmissions, setFilteredSubmissions] = useState<
        SubmissionStudentsProps[]
    >([])
    const setToast = useToast((state) => state.setToast)

    useEffect(() => {
        if (submissions) {
            if (filterVal.length <= 0)
                return setFilteredSubmissions(submissions.data)
            return setFilteredSubmissions(
                submissions.data.filter(
                    (submission) => submission.assignment.name === filterVal
                )
            )
        }
    }, [submissions, filterVal])

    const handleUpdateGrade = async () => {
        setIsEditable(null)
        try {
            axios
                .put(
                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/submission/${isEditable}`,
                    { grade: submissionGrade },
                    {
                        withCredentials: true,
                    }
                )
                .then((resp) => {
                    queryClient.invalidateQueries(["submission", classroomId])
                    setToast({
                        msg: "Grade Updated",
                        variant: "success",
                    })
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <EmptyWrapper data={submissions?.data} noDataText={"No Submissions"}>
            {/*   Filter   */}
            <div className="p-4">
                <h1 className="text-xl lg:text-2xl font-semibold p-2 text-dPri ">
                    Filter
                </h1>
                <select
                    onChange={(e) => setFilterVal(e.target.value)}
                    value={filterVal}
                    className="p-2 bg-transparent border-b-2 border-dPri/80 outline-0 text-gray-800 dark:text-gray-300 w-full text-sm md:text-lg "
                >
                    <option value={""}>Choose Assignment Name</option>
                    {assignmentList.map((assignment, i) => (
                        <option key={i} value={assignment}>
                            {assignment}
                        </option>
                    ))}
                </select>
            </div>
            {/*   Table   */}
            {submissions && (
                <Table
                    headers={[
                        "No",
                        "Student Name",
                        "Assignment Name",
                        "Grade",
                        "File Name",
                        "Action",
                    ]}
                    rows={filteredSubmissions.map(
                        (submission, i) =>
                            [
                                i + 1,
                                submission.student.name,
                                submission.assignment.name,
                                // Editable Grade
                                isEditable && isEditable === submission.id ? (
                                    <div className="flex items-center gap-x-2 justify-end lg:justify-center ">
                                        <input
                                            onChange={(e) =>
                                                setSubmissionGrade(
                                                    Number(e.target.value)
                                                )
                                            }
                                            value={submissionGrade}
                                            className="bg-transparent p-1 border-b-2 dark:border-gray-500 border-gray-700 outline-0 w-24 focus:border-dPri dark:focus:border-dPri transition-all "
                                            type={"number"}
                                            placeholder={"Enter Grade"}
                                        />
                                        <button
                                            onClick={() => setIsEditable(null)}
                                            className="bg-danger p-1 text-white text-xl rounded-md"
                                        >
                                            <RxCross2 />
                                        </button>
                                        <button
                                            onClick={handleUpdateGrade}
                                            className="bg-success p-1 text-white text-xl rounded-md"
                                        >
                                            <MdDone />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-x-2  justify-end lg:justify-center">
                                        <h1>
                                            {submission.grade
                                                ? submission.grade
                                                : "N/A"}
                                        </h1>
                                        <button
                                            onClick={() => {
                                                setSubmissionGrade(
                                                    submission.grade
                                                        ? submission.grade
                                                        : 0
                                                )
                                                setIsEditable(submission.id)
                                            }}
                                            className="bg-dPri p-1 text-white text-xl rounded-md"
                                        >
                                            <MdEdit />
                                        </button>
                                    </div>
                                ),
                                submission.filename,
                                <button
                                    onClick={() =>
                                        handleViewAttachment(
                                            `${submission.id}.${submission.type}`
                                        )
                                    }
                                    className="text-3xl  w-max mx-auto"
                                >
                                    <FiEye />
                                </button>,
                            ] as ReactNode[]
                    )}
                />
            )}
        </EmptyWrapper>
    )
}

export default SubmissionTable
