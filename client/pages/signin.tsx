import SelectRole from "@components/SelectRole/SelectRole"
import SignIn from "@components/SignIn/SignIn"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInInputProps, signInSchema } from "@schema/signin.schema"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

const signin = () => {
    const [role, setRole] = useState<Role>("")
    const [part, setPart] = useState(0)
    const [parent] = useAutoAnimate<any>()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInInputProps>({
        resolver: zodResolver(signInSchema),
    })

    const handleBack = () => {
        setPart((e) => e - 1)
    }

    const handleNext = () => {
        setPart((e) => e + 1)
    }

    const handleSignIn = (e: SignInInputProps) => {
        const data = { ...e, role }
        console.log(data)
    }

    return (
        <main
            ref={parent}
            className="flex flex-col items-center justify-center min-h-screen py-2 bg-back md:px-10 md:py-6 bg gap-y-10 lg:gap-y-16"
        >
            {/*           Part - 0       */}
            {part == 0 && (
                <SelectRole
                    role={role}
                    setRole={setRole}
                    handleNext={handleNext}
                    page={"signin"}
                />
            )}
            {/*         End Part - 0         */}

            {/*      Part - 1    */}
            {part == 1 && (
                <SignIn
                    role={role}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    register={register}
                    handleSignIn={handleSignIn}
                />
            )}
            {/*      End Part - 1    */}
        </main>
    )
}

export default signin
