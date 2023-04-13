import { ClickButton } from "@components/Button/Button"
import MainTitle from "@components/Title/MainTitle"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useUser from "@hooks/useUser"
import { IoMdAdd } from "react-icons/io"
import dynamic from "next/dynamic"

const Announcement = dynamic(
    () => import("@components/Classroom/Announcement/Announcement")
)
const EnrolledTable = dynamic(
    () => import("@components/Classroom/Student/EnrolledTable")
)

const AssignmentTable = dynamic(
    () => import("@components/Classroom/Student/AssignmentTable")
)
const Chatroom = dynamic(
    () => import("@components/Classroom/Chatroom/Chatroom")
)
interface Props {
    tab: Tabs
    assignments: AssignmentProps[] | undefined
    students: StudentProps[] | undefined
    classroomId: string | null
    toggleInviteModal: () => void
}

const StudentClassroom = ({
    tab,
    assignments,
    classroomId,
    students,
    toggleInviteModal,
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

    return (
        <>
            {/*    heading  */}
            <MainTitle sub title={`${title}`}>
                {/*    Invite Student  - Student  */}
                {tab === "students" && (
                    <ClickButton
                        size={"logo"}
                        onClick={toggleInviteModal}
                        variant="secondary"
                    >
                        <div className="flex items-center gap-x-2">
                            <IoMdAdd className="text-3xl" />
                            <h1 className="hidden lg:block">Invite Students</h1>
                        </div>
                    </ClickButton>
                )}
            </MainTitle>
            {/*      Assignment Table    */}
            {assignments && tab === "assignments" && (
                <AssignmentTable
                    assignments={assignments}
                    classroomId={classroomId}
                    submissions={submissions?.data}
                    user={user}
                />
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
        </>
    )
}

export default StudentClassroom
