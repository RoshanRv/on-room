import ConfirmationModal from "@components/Modal/ConfirmationModel"
import Modal from "@components/Modal/Modal"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import checkAnnouncementView from "@utils/checkAnnouncementView"
import formatDate from "@utils/formatDate"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"

interface AnnoucementCardProp {
    announcement: Announcement
}

const Card = ({ announcement }: AnnoucementCardProp) => {
    const { userRole, user } = useUser()
    const [isViewed, setIsViewed] = useState(false)
    const { isOn, toggleOn } = useToggle()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (user && userRole === "student") {
            const isViewed = checkAnnouncementView(
                user?.id,
                announcement.viewedUsers
            )
            setIsViewed(isViewed)
        } else {
            setIsViewed(true)
        }
    }, [user, announcement])

    const mutateFunc = async () =>
        axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/announcement/`,
            { announcementId: announcement.id },
            {
                withCredentials: true,
            }
        )

    const { mutate } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            queryClient.invalidateQueries(["announcement"])
        },
    })

    const { mutate: deleteAnnouncement } = useMutation({
        mutationFn: () =>
            axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/announcement/${announcement.id}`,
                {
                    withCredentials: true,
                }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries(["announcement"])
        },
    })

    const handleUpdateView = () => {
        mutate()
    }

    const handleDeleteAnnouncement = () => {
        deleteAnnouncement()
        toggleOn()
    }

    return (
        <>
            <div
                onClick={userRole === "student" ? handleUpdateView : () => null}
                className={`p-4 border-2 border-dPri rounded-md relative flex flex-col gap-y-2 transition-all ${
                    !isViewed && userRole === "student"
                        ? "bg-dPri/80 before:absolute before:content-[''] before:-top-2 before:-right-2 cursor-pointer before:h-4 before:w-4 before:rounded-full before:bg-danger   "
                        : "bg-white dark:bg-black"
                }  `}
            >
                {/*    Delete  */}
                {userRole === "teacher" && (
                    <button
                        onClick={toggleOn}
                        className="absolute top-3 right-2 dark:text-gray-200 text-gray-800 hover:text-danger dark:hover:text-danger transition-all"
                    >
                        <FiTrash2 />
                    </button>
                )}
                <h2
                    className={`text-2xl ${
                        isViewed ? "text-dPri" : "text-gray-100"
                    } font-semibold  `}
                >
                    {announcement.title}
                </h2>
                <p
                    className={` ${
                        isViewed
                            ? "dark:text-gray-300 text-gray-700 "
                            : "text-gray-800"
                    }
                 `}
                >
                    {announcement.description}
                </p>
                <p
                    className={`text-sm self-end ${
                        isViewed
                            ? "dark:text-gray-300 text-gray-700"
                            : "text-gray-800"
                    } `}
                >
                    {/* {moment(announcement.date.split("T")[0]).format()} */}
                    {"- " + formatDate(announcement.date)}
                </p>
            </div>
            {/*       Modal   */}
            <Modal isOn={isOn} toggleOn={toggleOn}>
                <ConfirmationModal
                    toggleConfirmationModal={toggleOn}
                    action={"delete"}
                    name={announcement.title}
                    type={"announcement"}
                    handleAction={() => handleDeleteAnnouncement()}
                />
            </Modal>
        </>
    )
}

export default Card
