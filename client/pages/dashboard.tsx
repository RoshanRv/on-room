import axios from "axios"
import React, { useEffect, useState } from "react"
import { useQuery, QueryObserver } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { UserResponse } from "@components/Header/Header"
import { queryClient } from "./_app"
import { ClickButton } from "@components/Button/Button"
import { IoIosAdd } from "react-icons/io"
import ClassroomCard from "@components/Dashboard/ClassroomCard"
import useToggle from "@hooks/useToggle"
import Modal from "@components/Modal/Modal"
import AddClassroomForm from "@components/Dashboard/AddClassroomForm"
import { ClassroomSchemaInput } from "@schema/dashboard.schema"

interface ClassroomProp extends ClassroomSchemaInput {
    id: string
    date: string
    teacher: TeacherProps
    teacherId: string
}
export interface ClassroomResponse {
    data: ClassroomProp[]
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

    useEffect(() => {
        // Create an observer to watch the query and update its result into state
        const observer = new QueryObserver(queryClient, {
            queryKey: ["users"],
            enabled: false,
            retry: 1,
        })
        const unsubscribe = observer.subscribe((queryResult: any) => {
            console.log(queryResult.data)
            setUserRole(queryResult.data.data.role)
        })

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [queryClient])

    const [userRole, setUserRole] = useState<"" | "teacher" | "student">("")

    const {
        data: classrooms,
        isError,
        isSuccess,
    } = useQuery<ClassroomResponse>({
        queryKey: ["classrooms"],
        queryFn: () =>
            axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/myclassroom`,
                {
                    withCredentials: true,
                }
            ),
        retry: 1,
    })

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
