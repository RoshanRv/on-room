import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInInputProps, signInSchema } from "@schema/signin.schema"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { queryClient } from "./_app"
import { useRouter } from "next/navigation"
import useToast from "@store/useToast"
import setErrorMsg from "@utils/setErrorMsg"
import dynamic from "next/dynamic"
import Spinner from "@components/Spinner"
import { useForm } from "react-hook-form"
import Head from "next/head"

const SelectRole = dynamic(() => import("@components/SelectRole/SelectRole"), {
    loading: () => <Spinner />,
})
const SignIn = dynamic(() => import("@components/SignIn/SignIn"), {
    loading: () => <Spinner />,
})

const signin = () => {
    const [role, setRole] = useState<Role>("")
    const [part, setPart] = useState(0)
    const [parent] = useAutoAnimate<any>()
    const router = useRouter()

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

    type Data = SignInInputProps & {
        role: Role
    }

    const mutateFunc = async (data: Data) => {
        const axios = (await import("axios")).default

        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
            data,
            {
                withCredentials: true,
            }
        )
    }

    const { setToast } = useToast(({ setToast }) => ({ setToast }))

    const { mutate, isLoading } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            setToast({
                msg: "Successfully Logged In",
                variant: "success",
            })
            queryClient.invalidateQueries({ queryKey: ["users"] })
            router.push("/dashboard")
        },
        onError: (e: any) => {
            setToast({
                msg: setErrorMsg(e.response!),
                variant: "error",
            })
        },
    })

    const handleSignIn = async (e: SignInInputProps) => {
        const data = { ...e, role }
        try {
            mutate(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>OnRoom | Sign In</title>
                <meta
                    name="description"
                    content="Connecting classrooms with OnRoom"
                />

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content="OnRoom | Sign In" />
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
                <meta property="og:title" content="OnRoom | Sign In" />
                <meta
                    property="og:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta property="og:image" content="meta.png" />

                {/* <!-- Twitter Meta Tags --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="OnRoom | Sign In" />
                <meta
                    name="twitter:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta name="twitter:image" content="meta.png" />
            </Head>
            <main
                ref={parent}
                className="flex flex-col items-center justify-center flex-1 h-full py-2 bg-gray-100  dark:bg-back md:px-10 md:py-6 bg gap-y-10 lg:gap-y-16"
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
        </>
    )
}

export default signin
