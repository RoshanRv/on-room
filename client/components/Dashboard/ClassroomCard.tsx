import { ClickButton } from "@components/Button/Button"
import Modal from "@components/Modal/Modal"
import useToggle from "@hooks/useToggle"
import { ClassroomSchemaInput } from "@schema/dashboard.schema"
import React from "react"

interface ClassroomDataProp extends ClassroomSchemaInput {
    id: string
    date: string
    teacher: TeacherProps
    teacherId: string
}
interface ClassroomCardProp {
    classroomData: ClassroomDataProp
    enroll?: boolean
    handleEnroll?: (id: string) => void
}

const ClassroomCard = ({
    classroomData,
    enroll = false,
    handleEnroll,
}: ClassroomCardProp) => {
    const { isOn, toggleOn } = useToggle()

    return (
        <div className="flex flex-col p-2 transition-all bg-gray-200 border-2 rounded-md shadow-lg cursor-pointer dark:bg-gray-800 dark:shadow-xl md:p-4 gap-y-6 md:border-4 shadow-gray-400 dark:shadow-black border-dPri/70 ">
            <div className="overflow-hidden rounded-md ">
                <img
                    src={classroomData.img}
                    alt={"classroom_img"}
                    className="transition-all rounded-md hover:scale-110"
                />
            </div>
            <div className="pt-2 text-gray-700 border-t dark:text-gray-300 border-dPri">
                <h2 className="text-xl font-semibold text-center md:text-2xl lg:text-3xl text-dPri">
                    {classroomData.title}
                </h2>
                <h4 className="mb-2 text-right">{`- ${classroomData.teacher?.name}`}</h4>
                <p className="">{classroomData.description}</p>
            </div>
            {/*      Enroll Btn    */}
            {enroll && (
                <ClickButton
                    className="mt-auto"
                    size={"small"}
                    onClick={toggleOn}
                >
                    <h1>Enroll Now!!!</h1>
                </ClickButton>
            )}
            {/*    Enroll Confirmation    */}

            <Modal isOn={isOn} toggleOn={toggleOn}>
                <>
                    <h1 className="text-2xl mb-10 font-semibold text-dPri">
                        Are You Sure? You Want To Enroll In{" "}
                        {classroomData.title} Course?
                    </h1>
                    <div className="flex items-center gap-x-4 justify-around">
                        {/*   Yes btn   */}
                        <ClickButton
                            size={"small"}
                            width
                            onClick={() => {
                                handleEnroll && handleEnroll(classroomData.id)
                                toggleOn
                            }}
                        >
                            <h1>YES!!</h1>
                        </ClickButton>
                        {/*   No btn   */}

                        <ClickButton
                            size={"small"}
                            variant={"secondary"}
                            width
                            onClick={toggleOn}
                        >
                            <h1>NO</h1>
                        </ClickButton>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default ClassroomCard
