import { LinkButton } from "@components/Button/Button"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { QueryObserver, useQueryClient } from "@tanstack/react-query"
import { QueryCache, useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface UserResponse {
    data: UserProps
}

const Header = () => {
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
    })

    const [showProfile, setShowProfile] = useState(false)

    console.log(isSuccess)

    // useEffect(() => {
    //     const observer = new QueryObserver(queryClient, {
    //         queryKey: ["users"],
    //         enabled: false,
    //     })
    //     const unsubscribe = observer.subscribe((queryResult: any) => {
    //         if (queryResult.data) {
    //             setUser(queryResult.data.data)
    //         }
    //     })

    //     return () => {
    //         unsubscribe()
    //     }
    // }, [queryClient])

    return (
        <header className="top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-2 shadow-md md:px-8 lg:px-16 bg-back md:py-4 shadow-black/30 ">
            <div>
                <Link href={"/"}>
                    <h1 className="text-4xl font-bold text-white text-shadow-sm ">
                        On-Room
                    </h1>
                </Link>
            </div>
            {/*    Sign In And Sign Up  */}
            {!isSuccess ? (
                <div className="flex items-center gap-x-8">
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
                </div>
            ) : (
                // Dashboard
                <div className="flex items-center justify-center text-xl font-semibold text-dPri gap-x-12">
                    <Link href={"/dashboard"}>
                        <h1>Dashboard</h1>
                    </Link>
                    {/* Profile */}
                    <div className="relative z-50">
                        {/* img */}
                        <div
                            onClick={() => setShowProfile((e) => !e)}
                            className="w-12 h-12 rounded-full cursor-pointer"
                        >
                            <img
                                src={user.data.img}
                                alt="profile_pic"
                                className="w-full h-full rounded-full"
                            />
                        </div>
                        {/*   Dropdown   */}
                        <div
                            className={`shadow-md shadow-black/50 absolute flex left-0 flex-col p-3 px-4 translate-y-5 bg-gray-800 -translate-x-[25%] -z-10 top-full origin-top text-gray-400 ${
                                showProfile ? "scale-100" : "scale-0"
                            } gap-y-2 transition-all `}
                        >
                            <h1 className="transition-all hover:text-dPri">
                                Profile
                            </h1>
                            <h1>Logout</h1>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
