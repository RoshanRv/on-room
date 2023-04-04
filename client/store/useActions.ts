import isPresent from "@utils/isPresent"
import { create } from "zustand"

interface myObj {
    id: string
}

interface UseActionProp {
    isEnrolled: boolean
    isNotEnrolled: boolean
    isOwner: boolean
    isNotOwner: boolean

    setIsEnrolled: (role: UserProps["role"] | "", isPresentVal: boolean) => void
    setIsOwner: (
        role: UserProps["role"] | "",
        id: string,
        teacherId: string
    ) => void
}

const useActions = create<UseActionProp>()((set) => ({
    isEnrolled: false,
    isNotEnrolled: false,
    isOwner: false,
    isNotOwner: false,

    setIsEnrolled: (role, isPresentVal) =>
        set(() => ({
            isEnrolled: role === "student" && isPresentVal,
            isNotEnrolled: role === "student" && !isPresentVal,
        })),

    setIsOwner: (role, id, teacherId) =>
        set({
            isOwner: role === "teacher" && id === teacherId,
            isNotOwner: role === "teacher" && id !== teacherId,
        }),
}))

export default useActions
