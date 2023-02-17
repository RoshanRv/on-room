import { LinkButton } from "@components/Button/Button"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { QueryCache, useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { queryClient } from "pages/_app"
import useToggle from "@hooks/useToggle"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"
import { usePathname, useRouter } from "next/navigation"

export interface UserResponse {
    data: UserProps
}

const Header = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [tab, setTab] = useState("")

    useEffect(() => {}, [pathname])

    const {
        data: user,
        isError,
        isSuccess,
    } = useQuery<UserResponse>({
        queryKey: ["users"],
        queryFn: () =>
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
                withCredentials: true,
            }),
        retry: 1,
    })

    const { isOn: isDark, toggleOn: toggleDark } = useToggle()

    const { mutate } = useMutation({
        mutationFn: () => {
            return axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                {
                    withCredentials: true,
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
            router.push("/signin")
        },
    })

    useEffect(() => {
        // console.log(isDark)

        if (isDark) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDark])

    return (
        <header className="top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-2 bg-white shadow-md md:px-8 lg:px-16 dark:bg-back md:py-4 shadow-black/30 ">
            <div>
                <Link href={"/"}>
                    <h1 className="text-4xl font-bold text-gray-700 dark:text-white dark:text-shadow-sm ">
                        On-Room
                    </h1>
                </Link>
            </div>
            {/*    Sign In And Sign Up  */}
            <div className="flex items-center justify-center text-xl font-semibold text-dPri gap-x-12 ">
                {!isSuccess ? (
                    <>
                        <LinkButton
                            link={"signup"}
                            size={"small"}
                            variant={"primary"}
                        >
                            {<h1>Sign Up</h1>}
                        </LinkButton>
                        <LinkButton
                            link={"signin"}
                            size={"small"}
                            variant={"secondary"}
                        >
                            {<h1>Sign In</h1>}
                        </LinkButton>
                    </>
                ) : (
                    // </div>
                    // Dashboard
                    <>
                        {user.data.role == "student" && (
                            <Link href={"/browse-classroom"}>
                                <h1
                                    className={`relative before:absolute before:contents-[''] ${
                                        pathname == "/browse-classroom"
                                            ? "before:w-full"
                                            : "before:w-0"
                                    }  before:transition-all origin-center before:h-1 before:bg-dPri before:top-full before:left-0  rounded-md`}
                                >
                                    Find Classroom
                                </h1>
                            </Link>
                        )}
                        <Link href={"/dashboard"}>
                            <h1
                                className={`relative before:absolute before:contents-[''] ${
                                    pathname == "/dashboard"
                                        ? "before:w-full"
                                        : "before:w-0"
                                }  before:transition-all origin-center before:h-1 before:bg-dPri before:top-full before:left-0  rounded-md`}
                            >
                                Dashboard
                            </h1>
                        </Link>

                        {/* Profile */}
                        <div className="relative z-50 group">
                            {/* img */}
                            <div className="w-12 h-12 border-2 rounded-full cursor-pointer border-dPri">
                                <img
                                    src={user.data.img}
                                    alt="profile_pic"
                                    className="w-full h-full rounded-full"
                                />
                                {/*   Dropdown   */}
                                <div
                                    className={` shadow-md shadow-black/50 absolute flex left-0 flex-col p-3 px-6 translate-y-5 bg-white dark:bg-gray-900 -translate-x-[25%] -z-10 top-full origin-top text-gray-400 rounded-md gap-y-2 transition-all group-hover:scale-100 scale-0 `}
                                >
                                    <Link href={"/profile"}>
                                        <h1 className="transition-all hover:text-dPri">
                                            Profile
                                        </h1>
                                    </Link>
                                    <h1
                                        onClick={() => mutate()}
                                        className="transition-all hover:text-dPri"
                                    >
                                        Logout
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/*    Light/Dark      */}
                <button onClick={toggleDark} className=" text-dPri">
                    {isDark ? (
                        <MdOutlineDarkMode className="" />
                    ) : (
                        <MdOutlineLightMode />
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header
