import { LinkButton } from "@components/Button/Button"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useToggle from "@hooks/useToggle"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"
import { usePathname } from "next/navigation"
import checkAnnouncementView from "@utils/checkAnnouncementView"
import Notification from "./Notification"
import { BiMenu } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import Profile from "./Profile"

export interface Announcements {
    id: string
    title: string
    classroomId: string
    viewedUsers: {
        id: string
    }[]
}

const Header = () => {
    const pathname = usePathname()

    const [unviewedAnnouncements, setUnviewedAnnouncements] = useState<
        Announcements[]
    >([])

    const {
        data: user,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get<UserProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
                {
                    withCredentials: true,
                }
            ),
        retry: 1,
    })

    const { data: announcements } = useQuery({
        queryKey: ["announcements"],
        queryFn: () =>
            axios.get<Announcements[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/announcements`,
                {
                    withCredentials: true,
                }
            ),
        enabled: !!user?.data.id,
        retry: 1,
    })

    //      Filters the unviewed announcement
    useEffect(() => {
        if (announcements && user?.data.role === "student") {
            setUnviewedAnnouncements(
                announcements.data.filter(
                    (announcement) =>
                        !checkAnnouncementView(
                            user.data.id,
                            announcement.viewedUsers
                        )
                )
            )
        }

        if (user?.data.role === "teacher") setUnviewedAnnouncements([])
    }, [announcements, user])

    const { isOn: isDark, toggleOn: toggleDark } = useToggle()
    const { isOn: isNav, toggleOn: toggleNav } = useToggle()

    useEffect(() => {
        if (isDark) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDark])

    return (
        <header className="top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-2 bg-white shadow-md md:px-8 lg:px-16 dark:bg-back md:py-4 shadow-black/30 ">
            <div>
                {/*   Logo   */}
                <Link href={"/"}>
                    <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold text-gray-700 dark:text-white dark:text-shadow-sm ">
                        On-Room
                    </h1>
                </Link>
            </div>
            {/*    Sign In And Sign Up - Lap  */}
            <div
                className={`${
                    isNav ? "left-0" : "left-full"
                } flex flex-col lg:flex-row gap-y-4 items-start  lg:items-center lg:justify-center text-xl font-semibold text-dPri gap-x-10 fixed lg:static dark:bg-back bg-gray-100 lg:bg-transparent  w-full lg:w-auto h-screen lg:h-auto top-0 left-0 p-16 lg:p-0 transition-all `}
            >
                {/* Close Btn  - Mobile */}
                <button
                    onClick={toggleNav}
                    className="text-dPri font-semibold text-2xl absolute top-5 right-5 lg:hidden"
                >
                    <AiOutlineClose />
                </button>
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
                    <>
                        {user.data.role === "student" && (
                            // browse classroom - student only
                            <Link href={"/browse-classroom"}>
                                <h1
                                    className={`relative before:absolute before:contents-[''] ${
                                        pathname == "/browse-classroom"
                                            ? "before:w-full"
                                            : "before:w-0"
                                    }  before:transition-all origin-center before:h-1 before:bg-dPri before:top-full before:left-0  rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 p-2`}
                                >
                                    Find Classroom
                                </h1>
                            </Link>
                        )}
                        {/*    dashboard - teacher & student  */}
                        <Link href={"/dashboard"}>
                            <h1
                                className={`relative before:absolute before:contents-[''] ${
                                    pathname == "/dashboard"
                                        ? "before:w-full"
                                        : "before:w-0"
                                }  before:transition-all origin-center before:h-1 before:bg-dPri before:top-full before:left-0 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md`}
                            >
                                Dashboard
                            </h1>
                        </Link>

                        {/*    Notification  */}
                        <div className="hidden lg:block">
                            <Notification
                                unviewedAnnouncements={unviewedAnnouncements}
                            />
                        </div>

                        {/* Profile */}
                        <div className="hidden lg:block">
                            <Profile user={user.data} />
                        </div>
                    </>
                )}
                {/*    Light/Dark      */}
                <button
                    onClick={toggleDark}
                    className=" text-dPri hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg "
                >
                    {isDark ? (
                        <MdOutlineDarkMode className="" />
                    ) : (
                        <MdOutlineLightMode />
                    )}
                </button>
            </div>
            {/*     End - Nav - LAb     */}

            {/*     Mobile Nav   */}
            <div className="flex gap-x-4 lg:hidden text-2xl text-dPri -z-10">
                {user && (
                    <>
                        {" "}
                        <Profile user={user.data} />{" "}
                        <Notification
                            unviewedAnnouncements={unviewedAnnouncements}
                        />
                    </>
                )}
                <button onClick={toggleNav} className=" ">
                    <BiMenu />
                </button>
            </div>
        </header>
    )
}

export default Header
