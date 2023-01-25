import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    dehydrate,
    QueryClient,
    useQuery,
    QueryObserver,
    useQueryClient,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { UserResponse } from "@components/Header/Header"
import { queryClient } from "./_app"
import { ClickButton } from "@components/Button/Button"
import { IoIosAdd } from "react-icons/io"
import ClassroomCard from "@components/Dashboard/ClassroomCard"
import useToggle from "@hooks/useToggle"
import Modal from "@components/Modal/Modal"
import AddClassroomForm from "@components/Dashboard/AddClassroomForm"
import { classroomSchemaInput } from "@schema/dashboard.schema"

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

    interface ClassroomProp extends classroomSchemaInput {
        id: string
        date: string
        teacher: TeacherProps
        teacherId: string
    }
    interface ClassroomResponse {
        data: ClassroomProp[]
    }

    const {
        data: classrooms,
        isError,
        isSuccess,
    } = useQuery<ClassroomResponse>({
        queryKey: ["classrooms"],
        queryFn: () =>
            axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom`,
                {
                    withCredentials: true,
                }
            ),
        retry: 1,
    })

    console.log(classrooms)

    const { isOn, toggleOn } = useToggle()

    if (isError) router.push("/signin")

    if (isSuccess)
        return (
            <main className="flex flex-col flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
                {/*         Heading and Add Classroom Btn   */}
                <div className="flex items-baseline justify-between pb-4 border-b border-dPri">
                    <h1 className="text-2xl font-semibold lg:text-4xl text-dPri">
                        Your Classroom
                    </h1>
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
                </div>

                {/*       Classes       */}
                {classrooms && (
                    <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {classrooms.data.map((classroom, i) => (
                            <ClassroomCard key={i} classroomData={classroom} />
                        ))}
                    </div>
                )}

                {/*    Add Classroom Modal      */}

                <Modal isOn={isOn} toggleOn={toggleOn}>
                    <AddClassroomForm />
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
