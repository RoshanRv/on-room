import { object, string, TypeOf } from "zod"

export const signUp1Schema = object({
    email: string().email().min(1, "Email is Required"),
    password: string().min(3, "Min 3 Characters"),
    confirmPassword: string().min(3, "Min 3 Characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password Doesn't Match",
    path: ["confirmPassword"],
})

export const signUp2Schema = object({
    name: string().min(1, "Name is Required"),
    img: string().url(),
})

export type SignUp1InputProps = TypeOf<typeof signUp1Schema>
export type SignUp2InputProps = TypeOf<typeof signUp2Schema>
