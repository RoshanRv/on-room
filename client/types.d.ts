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

interface UserProps {
    name: string
    img: string
    role: Exclude<Role, "">
    email: string
    sessionId: string
    id: string
}
