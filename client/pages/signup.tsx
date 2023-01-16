import React, { useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectRole from "@components/SelectRole/SelectRole"
import { omit } from "lodash"

import {
    SignUp1InputProps,
    SignUp2InputProps,
    signUp1Schema,
    signUp2Schema,
} from "@schema/signup.schema"
import SignUp1 from "@components/SignUp/SignUp1"
import SignUp2 from "@components/SignUp/SignUp2"
import axios from "axios"

const DEFAULT_IMG =
    "https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000"

const signUp = () => {
    const [role, setRole] = useState<Role>("")
    const [part, setPart] = useState(0)
    const [imgUrl, setImgUrl] = useState(DEFAULT_IMG)
    const [parent] = useAutoAnimate<any>()

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<SignUp1InputProps>({
        resolver: zodResolver(signUp1Schema),
    })

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        reset,
    } = useForm<SignUp2InputProps>({
        defaultValues: {
            img: DEFAULT_IMG,
        },
        resolver: zodResolver(signUp2Schema),
    })

    const handleBack = () => {
        setPart((e) => e - 1)
    }

    const handleNext = () => {
        setPart((e) => e + 1)
    }

    const handleSignUp = async (e: SignUp2InputProps) => {
        const data = { ...e, ...getValues(), role }

        const filteredData = omit(data, ["confirmPassword"])

        try {
            const user = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                filteredData,
                {
                    withCredentials: true,
                }
            )
            console.log(user)
        } catch (e) {
            console.log(e)
        }
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
                    page={"signup"}
                />
            )}
            {/*         End Part - 0         */}

            {/*      Part - 1    */}
            {part == 1 && (
                <SignUp1
                    role={role}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    register={register}
                />
            )}
            {/*      End Part - 1    */}

            {/*      Part - 2    */}
            {part == 2 && (
                <SignUp2
                    handleBack={handleBack}
                    handleSubmit={handleSubmit2}
                    errors={errors2}
                    register={register2}
                    reset={reset}
                    imgUrl={imgUrl}
                    setImgUrl={setImgUrl}
                    handleSignUp={handleSignUp}
                />
            )}
            {/*      End Part - 2    */}
        </main>
    )
}

export default signUp
