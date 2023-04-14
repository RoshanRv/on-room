import React, { useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    SignUp1InputProps,
    SignUp2InputProps,
    signUp1Schema,
    signUp2Schema,
} from "@schema/signup.schema"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import useToast from "@store/useToast"
import setErrorMsg from "@utils/setErrorMsg"
import dynamic from "next/dynamic"
import Spinner from "@components/Spinner"
import Head from "next/head"

const SelectRole = dynamic(() => import("@components/SelectRole/SelectRole"), {
    loading: () => <Spinner />,
})
const SignUp1 = dynamic(() => import("@components/SignUp/SignUp1"), {
    loading: () => <Spinner />,
})
const SignUp2 = dynamic(() => import("@components/SignUp/SignUp2"), {
    loading: () => <Spinner />,
})

const DEFAULT_IMG =
    "https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000"

const signUp = async () => {
    const [role, setRole] = useState<Role>("")
    const [part, setPart] = useState(0)
    const [imgUrl, setImgUrl] = useState(DEFAULT_IMG)
    const [parent] = useAutoAnimate<any>()
    const router = useRouter()

    const mutateFunc = async (data: Data) => {
        const omit = (await import("lodash")).omit
        const filteredData = omit(data, ["confirmPassword"])

        const axios = (await import("axios")).default

        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
            filteredData
        )
    }

    const { setToast } = useToast(({ setToast }) => ({ setToast }))

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            setToast({
                msg: "User Created Successfully",
                variant: "success",
            })
            router.push("/signin")
        },
        onError(e: any) {
            setToast({
                msg: setErrorMsg(e.response!),
                variant: "error",
            })
        },
    })

    const useForm = (await import("react-hook-form")).useForm
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

    type Data = SignUp1InputProps &
        SignUp2InputProps & {
            role: typeof role
        }

    const handleSignUp = async (e: SignUp2InputProps) => {
        const data = { ...e, ...getValues(), role }

        try {
            const user = await mutateAsync(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>OnRoom | Sign Up</title>
                <meta
                    name="description"
                    content="Connecting classrooms with OnRoom"
                />

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content="OnRoom | Sign Up" />
                <meta
                    itemProp="description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta itemProp="image" content="meta.png" />

                {/* <!-- Facebook Meta Tags --> */}
                <meta
                    property="og:url"
                    content="https://portfolio-roshanrv.vercel.app"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="OnRoom | Sign Up" />
                <meta
                    property="og:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta property="og:image" content="meta.png" />

                {/* <!-- Twitter Meta Tags --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="OnRoom | Sign Up" />
                <meta
                    name="twitter:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta name="twitter:image" content="meta.png" />
            </Head>
            <main
                ref={parent}
                className="flex flex-col items-center justify-center flex-1 h-full py-2 bg-gray-100 dark:bg-back md:px-10 md:py-6 bg gap-y-10 lg:gap-y-16"
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
        </>
    )
}

export default signUp
