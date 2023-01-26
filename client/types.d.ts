type Role = "" | "student" | "teacher"

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
