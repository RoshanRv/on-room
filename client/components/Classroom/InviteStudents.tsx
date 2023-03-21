import { ClickButton } from "@components/Button/Button"
import { Email } from "@components/Email"
import useUser from "@hooks/useUser"
import { render } from "@react-email/render"
import useToast from "@store/useToast"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"

const InviteStudents = ({
    toggleOn,
    classroomId,
    classroomName,
}: {
    toggleOn: () => void
    classroomId: string
    classroomName: string | undefined
}) => {
    const { data: students } = useQuery({
        queryKey: ["students"],
        queryFn: () =>
            axios.get<StudentProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/not/enrolled/${classroomId}`,
                { withCredentials: true }
            ),
    })

    const setToast = useToast((state) => state.setToast)
    const { user } = useUser()

    const handleSendEmail = async (
        studentEmailId: string,
        studentName: string
    ) => {
        try {
            const html = render(
                <Email
                    name={studentName}
                    classroom={classroomName}
                    user={user?.name}
                />
            )
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/email/${studentEmailId}`,
                { html },
                { withCredentials: true }
            )

            setToast({
                msg: "Email Sent ",
                variant: "success",
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {" "}
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                Invite Students
            </h1>
            <div className="text-lg mt-8">
                {students?.data.map((student, i) => (
                    <div
                        className="p-2 flex justify-between items-center text-dPri hover:bg-white transition-all dark:hover:bg-gray-800 rounded-md "
                        key={i}
                    >
                        <h1>{`${student.name} (${student.email})`}</h1>
                        <ClickButton
                            variant={"secondary"}
                            size={"small"}
                            onClick={() =>
                                handleSendEmail(student.email, student.name)
                            }
                        >
                            <h1>Invite</h1>
                        </ClickButton>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InviteStudents
