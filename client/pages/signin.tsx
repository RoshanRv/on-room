import SelectRole from "@components/SelectRole/SelectRole"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp1InputProps, signUp1Schema } from "@schema/signup.schema"
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
        getValues,
    } = useForm<SignUp1InputProps>({
        resolver: zodResolver(signUp1Schema),
    })

    const handleBack = () => {
        setPart((e) => e - 1)
    }

    const handleNext = () => {
        setPart((e) => e + 1)
    }

    const handleSignUp = (e: SignUp1InputProps) => {
        const data = { ...e, ...getValues(), role }
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
        </main>
    )
}

export default signin
