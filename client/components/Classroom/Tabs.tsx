import React from "react"
import { MdOutlineAssignment, MdAssignmentTurnedIn } from "react-icons/md"
import { HiUser } from "react-icons/hi"
import { IoMdMegaphone } from "react-icons/io"
import { BsChatSquareTextFill } from "react-icons/bs"
import useUser from "@hooks/useUser"

interface Props {
    tab: Tabs
    setTab: (tab: Tabs) => void
}

type TabListProps = { name: Tabs; icon: JSX.Element }[]

const tabList: TabListProps = [
    {
        name: "assignments",
        icon: <MdOutlineAssignment />,
    },

    {
        name: "submissions",
        icon: <MdAssignmentTurnedIn />,
    },
    {
        name: "students",
        icon: <HiUser />,
    },
    {
        name: "announcements",
        icon: <IoMdMegaphone />,
    },
    {
        name: "chats",
        icon: <BsChatSquareTextFill />,
    },
]

const Tabs = ({ tab, setTab }: Props) => {
    const { userRole } = useUser()
    return (
        <aside className="flex h-full flex-col gap-y-2 md:w-3/12 xl:w-2/12 text-lg md:text-xl  text-gray-600 dark:text-gray-400 border-r-2 border-dPri/60 pr-2">
            {tabList.map((tabDetail, i) => {
                //  Exclude Submissions tab for students
                if (
                    userRole &&
                    userRole === "student" &&
                    tabDetail.name === "submissions"
                )
                    return <></>
                return (
                    <div
                        key={i}
                        onClick={() => setTab(tabDetail.name as Tabs)}
                        className={`capitalize transition-all cursor-pointer ${
                            tab === tabDetail.name && "text-dPri/70"
                        } flex items-center gap-x-4 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 md:p-3 rounded-md  relative
                    
                    `}
                    >
                        {tabDetail.icon}
                        <h1 className="hidden lg:block">{tabDetail.name}</h1>
                    </div>
                )
            })}
        </aside>
    )
}

export default Tabs
