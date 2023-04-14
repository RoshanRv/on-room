import { ClickButton } from "@components/Button/Button"
import Spinner from "@components/Spinner"
import useToggle from "@hooks/useToggle"
import dynamic from "next/dynamic"
import Image from "next/image"

const Modal = dynamic(() => import("@components/Modal/Modal"), {
    loading: () => <Spinner />,
})
const ConfirmationModal = dynamic(
    () => import("@components/Modal/ConfirmationModel"),
    {
        loading: () => <Spinner />,
    }
)

interface ClassroomDataProp extends ClassroomProps {
    teacher: TeacherProps
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
        <div className="flex flex-col p-4 transition-all bg-gray-200 border-2 rounded-md shadow-lg cursor-pointer dark:bg-gray-800 dark:shadow-xl md:p-4 gap-y-6 md:border-4 shadow-gray-400 dark:shadow-black border-dPri/70 ">
            <div className="overflow-hidden rounded-md w-full md:w-full h-44 md:h-52 relative ">
                <Image
                    src={classroomData.img || ""}
                    alt={"classroom_img"}
                    className="transition-all rounded-md hover:scale-110 w-full h-full"
                    fill={true}
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

            {isOn && (
                <Modal isOn={isOn} toggleOn={toggleOn}>
                    <ConfirmationModal
                        name={classroomData.title}
                        type={"course"}
                        toggleConfirmationModal={toggleOn}
                        action="enroll"
                        handleAction={() => {
                            toggleOn()
                            handleEnroll && handleEnroll(classroomData.id)
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}

export default ClassroomCard
