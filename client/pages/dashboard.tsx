import axios from "axios"
import React, { useEffect, useState } from "react"
import { useQuery, QueryObserver } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { queryClient } from "./_app"
import { ClickButton } from "@components/Button/Button"
import { IoIosAdd } from "react-icons/io"
import ClassroomCard from "@components/Dashboard/ClassroomCard"
import useToggle from "@hooks/useToggle"
import Modal from "@components/Modal/Modal"
import AddClassroomForm from "@components/Dashboard/AddClassroomForm"
import { ClassroomSchemaInput } from "@schema/dashboard.schema"
import Link from "next/link"
import MainTitle from "@components/Title/MainTitle"
import useUser from "@hooks/useUser"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import { render } from "@react-email/render"
import { Email } from "@components/Email"
import useToast from "@store/useToast"
import { shallow } from "zustand/shallow"

interface DashboardClassroomProp extends ClassroomProps {
    teacher: TeacherProps
}

const dashboard = () => {
    const router = useRouter()

    // const {
    //     data: user,
    //     isError,
    //     isSuccess,
    // } = useQuery<UserResponse>({
    //     queryKey: ["users"],
    //     queryFn: () =>
    //         axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
    //             withCredentials: true,
    //         }),
    //     retry: 1,
    // })

    const { userRole } = useUser()

    const {
        data: classrooms,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["classrooms"],
        queryFn: () =>
            axios.get<DashboardClassroomProp[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/myclassroom`,
                {
                    withCredentials: true,
                }
            ),
        retry: 1,
    })
    const { isOn, toggleOn } = useToggle()

    const { setToast, toast } = useToast(
        (state) => ({ toast: state.toast, setToast: state.setToast }),
        shallow
    )

    console.log(toast)

    if (isError) router.push("/signin")

    if (isSuccess)
        return (
            <main className="flex flex-col flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
                {/*         Heading and Add Classroom Btn   */}
                <MainTitle title="Your Classroom">
                    {/*       Add Class btn is only shown to teacher   */}

                    {userRole === "teacher" && (
                        <ClickButton
                            size={"small"}
                            onClick={toggleOn}
                            variant="primary"
                        >
                            <div className="flex items-center gap-x-2">
                                <IoIosAdd className="text-3xl" />
                                <h1>Add Classroom</h1>
                            </div>
                        </ClickButton>
                    )}
                </MainTitle>
                {/*       Classes       */}
                <EmptyWrapper
                    data={classrooms.data}
                    noDataText="You Have Not Enrolled Any Courses"
                >
                    <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {classrooms.data.map((classroom, i) => (
                            <Link
                                href={`/classroom/${classroom.id}`}
                                key={classroom.id}
                            >
                                <ClassroomCard classroomData={classroom} />
                            </Link>
                        ))}
                    </div>
                </EmptyWrapper>
                Email Testing
                <button
                    onClick={() =>
                        setToast({ msg: "Noooooo!!", variant: "error" })
                    }
                    // onClick={async () => {
                    //     const html = render(<Email />)
                    //     return axios
                    //         .post(
                    //             `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/email`,
                    //             { html },
                    //             { withCredentials: true }
                    //         )
                    //         .catch((err) => console.log(err))
                    // }}
                >
                    Toast
                </button>
                {/*    Add Classroom Modal      */}
                <Modal isOn={isOn} toggleOn={toggleOn}>
                    <AddClassroomForm toggleOn={toggleOn} />
                </Modal>
            </main>
        )
}

export default dashboard

// export const getServerSideProps = async ({
//     res,
//     req,
// }: {
//     res: any
//     req: any
// }) => {
//     try {
//         const user = await queryClient.fetchQuery(["users"], () =>
//             axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
//                 headers: {
//                     Cookie: req.headers.cookie,
//                 },
//             })
//         )

//         return {
//             props: {
//                 user: user.data,
//             },
//         }
//     } catch (e) {
//         console.log(e)

//         return {
//             redirect: {
//                 destination: "/signin",
//                 permanent: false,
//             },
//         }
//     }
// }
