import useUser from "@hooks/useUser"
import { useSearchParams } from "next/navigation"
import React, { FC, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { connect } from "socket.io-client"

interface Prop {}

interface ReceivedMsgProps {
    msg: string
    user: string
    time: string
}

const socket = connect(process.env.NEXT_PUBLIC_SERVER_ENDPOINT)

const Chatroom: FC<Prop> = ({}) => {
    const { user } = useUser()
    const classroomId = useSearchParams().get("id")
    const [receivedMsg, setReceivedMsg] = useState<ReceivedMsgProps[]>([])
    const [msg, setMsg] = useState("")
    const msgBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (user && classroomId) {
            socket.emit("join_room", user.name, classroomId)
        }
    }, [user?.name, classroomId])

    // console.log(receivedMsg)

    useEffect(() => {
        if (msgBoxRef.current) {
            const height = msgBoxRef.current.scrollHeight
            msgBoxRef.current.scrollTo(height, height)
        }
    }, [receivedMsg])

    useEffect(() => {
        socket.on("receive_msg", ({ msg, user, time }: ReceivedMsgProps) => {
            const newTime = new Date(Number(time))
            setReceivedMsg((pre) => [
                ...pre,
                {
                    msg,
                    user,
                    time: newTime.toLocaleString(),
                },
            ])
        })

        socket.on("previous_msg", (chats: ReceivedMsgProps[]) => {
            setReceivedMsg([])
            chats.forEach((chat) => {
                const newTime = new Date(Number(chat.time))
                setReceivedMsg((pre) => [
                    ...pre,
                    {
                        msg: chat.msg,
                        user: chat.user,
                        time: newTime.toLocaleString(),
                    },
                ])
            })
        })

        return () => {
            socket.off("receive_msg")
            socket.off("previous_msg")
        }
    }, [socket])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const msg = inputRef.current?.value

                    handleSendMsg(msg)
                }
            })
        }

        return () => {
            inputRef.current?.removeEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const msg = inputRef.current?.value

                    handleSendMsg(msg)
                }
            })
        }
    }, [inputRef, user])

    const handleSendMsg = (msg: string | undefined) => {
        if (msg != "" && user) {
            socket.emit(
                "send_msg",
                {
                    msg,
                    user: user.name,
                    time: Date.now().toString(),
                },
                classroomId
            )
            setMsg("")
        }
    }

    const isSender = (username: string) => {
        return user && username === user.name
    }

    return (
        <section className="border-2 border-dPri rounded-lg  bg-white dark:bg-black p-3 lg:p-6 mt-8 shadow-md gap-y-4  flex-1 flex flex-col text-gray-800 dark:text-gray-300 ">
            {/*     Messages  */}
            <div
                ref={msgBoxRef}
                className="  overflow-y-auto h-[50vh] rounded-lg bg-gray-100 dark:bg-back border-2 border-dPri p-2"
            >
                {receivedMsg.map((msg, i) => {
                    return (
                        <div
                            key={i}
                            className={`px-3 py-1 rounded-md w-max my-1 shadow-lg ${
                                isSender(msg.user)
                                    ? "bg-dPri text-white ml-auto"
                                    : "bg-white dark:bg-black text-dPri border border-dPri "
                            } `}
                        >
                            <h1 className="text-xs text-success font-bold ">
                                {msg.user}
                            </h1>
                            <h1 className="my-1">{msg.msg}</h1>
                            <p className="text-xs">
                                {msg.time.split(",")[1].slice(0, 6)}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/*  Input Msg   */}
            <div className="flex gap-x-4 justify-center items-center mt-auto ">
                <input
                    ref={inputRef}
                    placeholder="Ask Any Doubt Here..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    type="text"
                    className="bg-gray-100 dark:bg-gray-900 border-2 border-dPri shadow-lg w-full rounded-lg p-2 outline-none "
                />
                <button
                    onClick={() => handleSendMsg(msg)}
                    className="text-gray-600 dark:text-gray-400 p-2 border-2 border-dPri rounded-md "
                >
                    <IoSend />
                </button>
            </div>
        </section>
    )
}

export default Chatroom
