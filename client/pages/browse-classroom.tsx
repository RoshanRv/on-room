import ClassroomCard from "@components/Dashboard/ClassroomCard"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import MainTitle from "@components/Title/MainTitle"
import useToast from "@store/useToast"
import { useMutation, useQuery } from "@tanstack/react-query"
import setErrorMsg from "@utils/setErrorMsg"
import Head from "next/head"

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
        queryFn: async () => {
            const axios = (await import("axios")).default

            return axios.get<ClassroomTeacherProp[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom`,
                {
                    withCredentials: true,
                }
            )
        },
        retry: 1,
    })

    const toast = useToast((state) => state.setToast)

    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            const axios = (await import("axios")).default

            return axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/enroll`,
                { id },
                {
                    withCredentials: true,
                }
            )
        },

        onSuccess: () =>
            toast({
                msg: "Enrolled Successfully",
                variant: "success",
            }),

        onError: (err: any) => {
            toast({
                msg: setErrorMsg(err.response),
                variant: "error",
            })
        },
    })

    const handleEnroll = (id: string) => {
        mutate(id)
    }

    return (
        <>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>OnRoom | Browse-Classroom</title>
                <meta
                    name="description"
                    content="Connecting classrooms with OnRoom"
                />

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content="OnRoom | Browse-Classroom" />
                <meta
                    itemProp="description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta itemProp="image" content="meta.png" />

                {/* <!-- Facebook Meta Tags --> */}
                <meta
                    property="og:url"
                    content="https://portfolio-roshanrv.vercel.app"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="OnRoom | Browse-Classroom" />
                <meta
                    property="og:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta property="og:image" content="meta.png" />

                {/* <!-- Twitter Meta Tags --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="OnRoom | Browse-Classroom"
                />
                <meta
                    name="twitter:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta name="twitter:image" content="meta.png" />
            </Head>
            <main className="bg flex flex-col flex-1 h-full px-3 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
                {/*         Heading and Add Classroom Btn   */}
                <MainTitle inverse title="Find Classrooms" />

                {/*       Classes       */}
                <EmptyWrapper
                    data={classrooms?.data}
                    noDataText="No New Classrooms"
                >
                    <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {classrooms?.data.map((classroom, i) => (
                            <ClassroomCard
                                key={i}
                                classroomData={classroom}
                                enroll
                                handleEnroll={handleEnroll}
                            />
                        ))}
                    </div>
                </EmptyWrapper>
            </main>
        </>
    )
}

export default browseClassroom
