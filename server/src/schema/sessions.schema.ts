import { boolean, nativeEnum, object, string, TypeOf } from "zod"
import { Role } from "@prisma/client"

export const createSessionSchema = object({
    body: object({
        email: string().min(1, "Email is Required").email(),
        password: string().min(1, "Password is Required"),
        role: nativeEnum(Role),
    }),
})

export type createSessionSchemaType = TypeOf<typeof createSessionSchema>
