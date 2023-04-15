import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ClickButton } from "@components/Button/Button"
import { IoMdAdd } from "react-icons/io"
import ClassroomCard from "@components/Dashboard/ClassroomCard"
import useToggle from "@hooks/useToggle"
import Modal from "@components/Modal/Modal"
import MainTitle from "@components/Title/MainTitle"
import useUser from "@hooks/useUser"
import EmptyWrapper from "@components/EmptyWrapper/EmptyWrapper"
import dynamic from "next/dynamic"
import Spinner from "@components/Spinner"
import axios from "axios"
import Link from "next/link"
import Head from "next/head"

const AddClassroomForm = dynamic(
    () => import("@components/Dashboard/AddClassroomForm"),
    {
        loading: () => <Spinner />,
    }
)

interface DashboardClassroomProp extends ClassroomProps {
    teacher: TeacherProps
}

const dashboard = () => {
    const router = useRouter()

    const { userRole } = useUser()

    const {
        data: classrooms,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["classrooms"],
        queryFn: async () => {
            const axios = (await import("axios")).default
            return axios.get<DashboardClassroomProp[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/myclassroom`,
                {
                    withCredentials: true,
                }
            )
        },
        retry: 1,
    })
    const { isOn, toggleOn } = useToggle()

    if (isError) router.push("/signin")

    if (isSuccess)
        return (
            <>
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>OnRoom | Dashboard</title>
                    <meta
                        name="description"
                        content="Connecting classrooms with OnRoom"
                    />

                    {/* <!-- Google / Search Engine Tags --> */}
                    <meta itemProp="name" content="OnRoom | Dashboard" />
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
                    <meta property="og:title" content="OnRoom | Dashboard" />
                    <meta
                        property="og:description"
                        content="Connecting classrooms with OnRoom"
                    />
                    <meta property="og:image" content="meta.png" />

                    {/* <!-- Twitter Meta Tags --> */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="OnRoom | Dashboard" />
                    <meta
                        name="twitter:description"
                        content="Connecting classrooms with OnRoom"
                    />
                    <meta name="twitter:image" content="meta.png" />
                </Head>
                <main className="flex bg flex-col flex-1 h-full px-8 py-4 bg-gray-100 md:py-10 dark:bg-back md:px-8 lg:px-12">
                    {/*         Heading and Add Classroom Btn   */}
                    <MainTitle inverse title="Your Classroom">
                        {/*       Add Class btn is only shown to teacher   */}

                        {userRole === "teacher" && (
                            <ClickButton
                                size={"logo"}
                                onClick={toggleOn}
                                variant="primary"
                            >
                                <div className="flex items-center gap-x-2">
                                    <IoMdAdd className="text-3xl" />
                                    <h1 className="hidden md:block">
                                        Add Classroom
                                    </h1>
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

                    {/*    Add Classroom Modal      */}
                    <Modal isOn={isOn} toggleOn={toggleOn}>
                        <AddClassroomForm toggleOn={toggleOn} />
                    </Modal>
                </main>
            </>
        )
}

export default dashboard
