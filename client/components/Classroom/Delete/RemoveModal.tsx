import { ClickButton } from "@components/Button/Button"
import React from "react"

interface Props {
    classroom: ClassroomProps | undefined
    handleRemoveClassroom: () => void
    toggleRemoveModal: () => void
    action: "delete" | "unenroll"
}

const RemoveModal = ({
    classroom,
    handleRemoveClassroom,
    toggleRemoveModal,
    action,
}: Props) => {
    return (
        <>
            <h1 className="text-2xl mb-10 font-semibold text-dPri">
                Are You Sure? You Want To{" "}
                <span className="text-danger capitalize ">{action}</span>{" "}
                {classroom?.title} Course?
            </h1>
            <div className="flex items-center gap-x-4 justify-around">
                {/*   Yes btn   */}
                <ClickButton
                    size={"small"}
                    variant={"danger"}
                    width
                    onClick={handleRemoveClassroom}
                >
                    <h1>{`YES :-(`}</h1>
                </ClickButton>
                {/*   No btn   */}

                <ClickButton
                    size={"small"}
                    variant={"secondary"}
                    width
                    onClick={toggleRemoveModal}
                >
                    <h1>{`No :-)`}</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default RemoveModal
