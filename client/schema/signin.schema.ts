import { object, string, TypeOf } from "zod"

export const signInSchema = object({
    email: string().email().min(1, "Email is Required"),
    password: string(),
})

export type SignInInputProps = TypeOf<typeof signInSchema>
