import { ClickButton } from "@components/Button/Button"
import Tabs from "@components/Classroom/Tabs"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import useUser from "@hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { IoIosAdd } from "react-icons/io"

const Classroom = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const { userRole } = useUser()
    const { data: classroom } = useQuery({
        queryKey: ["classroom", "id"],
        queryFn: () =>
            axios.get<ClassroomProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/${id}`,
                { withCredentials: true }
            ),
    })
    const { isOn, toggleOn } = useToggle()

    const [tab, setTab] = useState<Tabs>("assignments")

    return (
        <main className="flex flex-col gap-y-4 flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*      Title and Unenroll/Edit btn    */}
            <MainTitle title={`${classroom?.data.title} Classroom`}>
                {userRole === "student" ? (
                    <ClickButton
                        size={"small"}
                        variant={"danger"}
                        onClick={() => null}
                    >
                        <h1>UnEnroll</h1>
                    </ClickButton>
                ) : (
                    <ClickButton
                        size={"small"}
                        variant={"secondary"}
                        onClick={() => null}
                    >
                        <h1>Edit</h1>
                    </ClickButton>
                )}
            </MainTitle>
            {/*      //Title    */}
            {/*      Description    */}
            <p className="dark:text-gray-300 text-gray-800">
                {classroom?.data.description}
            </p>

            <section className="flex mt-10 p-2 gap-x-10">
                {/*      Tabs    */}
                <Tabs tab={tab} setTab={setTab} />

                {/*     Assignments/Students Table     */}
                <section className="w-full">
                    {/*    heading  */}
                    <MainTitle
                        title={`${
                            tab === "assignments"
                                ? "Your Assignments"
                                : "Enrolled Students"
                        }`}
                    >
                        {userRole === "teacher" && tab === "assignments" && (
                            <ClickButton
                                size={"small"}
                                onClick={toggleOn}
                                variant="secondary"
                            >
                                <div className="flex items-center gap-x-2">
                                    <IoIosAdd className="text-3xl" />
                                    <h1>Add Assignment</h1>
                                </div>
                            </ClickButton>
                        )}
                    </MainTitle>
                </section>
            </section>

            {/*      Add Assignment Modal    */}
            <Modal isOn={isOn} toggleOn={toggleOn}>
                {/* <AddClassroomForm toggleOn={toggleOn} /> */}
            </Modal>
        </main>
    )
}

export default Classroom
