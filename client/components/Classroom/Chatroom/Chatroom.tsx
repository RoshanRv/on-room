import useUser from "@hooks/useUser"
import { useSearchParams } from "next/navigation"
import React, { FC, useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface Prop {
    socket: Socket
}

interface ReceivedMsgProps {
    msg: string
    user: string
    time: string
}

const Chatroom: FC<Prop> = ({ socket }) => {
    const { user } = useUser()
    const classroomId = useSearchParams().get("id")
    const [receivedMsg, setReceivedMsg] = useState<ReceivedMsgProps[]>([])

    // useEffect(() => {
    //     if (user && classroomId) {
    //         socket.emit("join_room", user.name, classroomId)
    //     }
    // }, [user?.name, classroomId])

    // console.log(receivedMsg)

    // useEffect(() => {
    //     socket.on("receive_msg", ({ msg, user, time }: ReceivedMsgProps) => {
    //         const newTime = new Date(time)
    //         setReceivedMsg((pre) => [
    //             ...pre,
    //             {
    //                 msg,
    //                 user,
    //                 time: newTime.toLocaleString(),
    //             },
    //         ])
    //     })

    //     return () => {
    //         socket.off("receive_msg")
    //     }
    // }, [socket])

    return (
        <section className="border-2 border-dPri rounded-lg bg-white dark:bg-black p-3 mt-8 shadow-md h-full flex-1 flex flex-col text-gray-800 dark:text-gray-300 ">
            Chatroom
        </section>
    )
}

export default Chatroom
