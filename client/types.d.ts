type Role = "" | "student" | "teacher"
type Tabs = "assignments" | "students"

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

interface TeacherProps {
    name: string
    img: string
    role: "teacher"
    email: string
    id: string
}

interface StudentProps {
    name: string
    img: string
    role: "student"
    email: string
    id: string
}

interface UserProps {
    name: string
    img: string
    role: Exclude<Role, "">
    email: string
    sessionId: string
    id: string
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
}
