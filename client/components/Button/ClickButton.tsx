import buttonClass from "@utils/buttonClass"
import { VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

export type ClickButtonProp = VariantProps<typeof buttonClass> & {
    onClick: () => void
    children: ReactNode
    isLoading?: boolean
}

const ClickButton = ({
    variant,
    width,
    disabled = false,
    onClick,
    children,
    isLoading = false,
}: ClickButtonProp) => {
    return (
        <button
            disabled={disabled as boolean}
            className={buttonClass({ variant, width, disabled })}
            onClick={onClick}
        >
            {!isLoading ? (
                children
            ) : (
                <div className="w-6 h-6 mx-auto border-4 border-white rounded-full border-t-transparent animate-spin"></div>
            )}
        </button>
    )
}

export default ClickButton
