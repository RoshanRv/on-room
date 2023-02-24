import { ClickButton } from "@components/Button/Button"
import React from "react"

interface Props {
    name: string | undefined
    handleAction: () => void
    toggleConfirmationModal: () => void
    action: "delete" | "unenroll" | "enroll"
    type: "assignment" | "course"
}

const ConfirmationModal = ({
    name,
    handleAction,
    toggleConfirmationModal,
    type,
    action,
}: Props) => {
    const color =
        action === "delete" || action === "unenroll"
            ? "text-danger"
            : "text-success"

    return (
        <>
            <h1 className="text-2xl mb-10 font-semibold text-dPri capitalize ">
                Are You Sure? You Want To{" "}
                <span className={`${color} capitalize `}>{action}</span> {name}{" "}
                {type} ?
            </h1>
            <div className="flex items-center gap-x-4 justify-around">
                {/*   Yes btn   */}
                <ClickButton
                    size={"small"}
                    variant={
                        action === "delete" || action === "unenroll"
                            ? "danger"
                            : "primary"
                    }
                    width
                    onClick={() => handleAction()}
                >
                    <h1>{`YES `}</h1>
                </ClickButton>
                {/*   No btn   */}

                <ClickButton
                    size={"small"}
                    variant={"secondary"}
                    width
                    onClick={toggleConfirmationModal}
                >
                    <h1>{`No`}</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default ConfirmationModal
