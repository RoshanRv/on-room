type Role = "" | "student" | "teacher"
type Tabs =
    | "assignments"
    | "students"
    | "announcements"
    | "submissions"
    | "chats"

interface CardRoleProps {
    role: Role
    img: StaticImageData
    name: "student" | "teacher"
    setRole: (role: Role) => void
}

interface SelectRoleProps {
    role: Role
    setRole: (role: Role) => void
    handleNext: () => void
    page: "signin" | "signup"
}

interface UserProps {
    name: string
    img: string
    role: Exclude<Role, "">
    email: string
    sessionId: string
    id: string
}

interface TeacherProps extends Omit<UserProps, "sessionId"> {
    role: "teacher"
}
interface StudentProps extends Omit<UserProps, "sessionId"> {
    role: "student"
}

interface ModalProps {
    isOn: boolean
    toggleOn: () => void
    children: ReactNode
}

interface ClassroomProps {
    id: string
    title: string
    date: string
    img: string
    description: string
    teacherId: string
    assignments: AssignmentProps[]
    announcements: Announcement[]
    student: StudentProps[]
}

interface AssignmentProps {
    id: string
    name: string
    description: string
    dueDate: string
    classroomId: string
    classroom: {
        student: ClassroomProps["student"]
        teacherId: string
    }
    attachments: Attachment[]
    submissions: SubmissionProps[]
}

interface FileProps {
    filename: string
    size: number
    type: string
}

interface Announcement {
    id: string
    title: string
    description: string
    date: string
    viewedUsers: StudentProps[]
}

interface Attachment {
    filename: string
    size: number
    type: string
    id: string
    assignmentId: string
}

interface SubmissionProps {
    filename: string
    size: number
    type: string
    id: string
    assignmentId: string
    studentId: string
    grade: null | number
}

interface SubmissionStudentsProps {
    filename: string
    size: number
    type: string
    id: string
    assignmentId: string
    assignment: AssignmentProps
    studentId: string
    student: StudentProps
    grade: null | number
}
