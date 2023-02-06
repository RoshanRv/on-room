import { object, string, TypeOf } from "zod"

export const signInSchema = object({
    email: string().email().min(1, "Email is Required"),
    password: string().min(1, "Password Is Required"),
})

export type SignInInputProps = TypeOf<typeof signInSchema>
