import React from "react"
import { MdOutlineNotificationsNone } from "react-icons/md"
import Link from "next/link"
import { Announcements } from "./Header"
import Announcement from "@components/Classroom/Announcement/Announcement"

interface Props {
    unviewedAnnouncements: Announcements[]
}

const Notification = ({ unviewedAnnouncements }: Props) => {
    return (
        <div className="group relative">
            <button
                className={`relative text-dPri hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg text-2xl ${
                    unviewedAnnouncements.length > 0
                        ? "before:absolute before:content-[''] before:top-2 before:right-2 cursor-pointer before:h-3 before:w-3 before:rounded-full before:bg-danger"
                        : ""
                } `}
            >
                <MdOutlineNotificationsNone />
            </button>
            {/*  Notifications Dropdown   */}
            <div
                className={` font-medium shadow-md shadow-black/50 absolute flex left-0 flex-col  translate-y-6 bg-white dark:bg-gray-900 -translate-x-[80%] whitespace-nowrap -z-10 top-full origin-top text-gray-400 rounded-md gap-y-2 transition-all group-hover:scale-100 scale-0 `}
            >
                {unviewedAnnouncements.map((announcement) => (
                    <Link href={`/classroom/${announcement.classroomId}`}>
                        <div className="hover:bg-gray-100 dark:hover:bg-gray-800 p-3 px-4 ">
                            <h1 className="text-dPri text-base font-semibold">
                                New Announcement
                            </h1>
                            <h1 className="text-sm">{announcement.title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Notification
