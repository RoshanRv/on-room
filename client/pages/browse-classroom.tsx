import ClassroomCard from "@components/Dashboard/ClassroomCard"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useToggle from "@hooks/useToggle"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"

interface ClassroomTeacherProp extends ClassroomProps {
    teacher: TeacherProps
}

const browseClassroom = () => {
    const {
        data: classrooms,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["classrooms"],
        queryFn: () =>
            axios.get<ClassroomTeacherProp[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom`,
                {
                    withCredentials: true,
                }
            ),
        retry: 1,
    })

    const { mutate } = useMutation({
        mutationFn: (id: string) =>
            axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/enroll`,
                { id },
                {
                    withCredentials: true,
                }
            ),
    })

    const handleEnroll = (id: string) => {
        mutate(id)
    }

    return (
        <main className="flex flex-col flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
            {/*         Heading and Add Classroom Btn   */}
            <MainTitle title="Find Classrooms" />

            {/*       Classes       */}
            {classrooms && (
                <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {classrooms.data.map((classroom, i) => (
                        <ClassroomCard
                            key={i}
                            classroomData={classroom}
                            enroll
                            handleEnroll={handleEnroll}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default browseClassroom
