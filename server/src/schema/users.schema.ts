import { object, string, nativeEnum, TypeOf } from "zod"
import { Role } from "@prisma/client"

export const createUserSchema = object({
    body: object({
        name: string().min(1, "Name is Required"),
        email: string().email().min(1, "Email is Required"),
        password: string().min(1, "Password is Required"),
        img: string().min(1, "Img is Required").url(),
        role: nativeEnum(Role),
    }),
})

export const updateUserSchema = object({
    body: object({
        name: string().min(1, "Name is Required"),
        img: string().min(1, "Img is Required").url(),
    }),
})

export type createUserSchemaType = TypeOf<typeof createUserSchema>

export type updateUserSchemaType = TypeOf<typeof updateUserSchema>
