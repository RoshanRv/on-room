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
