import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

export type ClickButtonProp = VariantProps<typeof buttonClass> & {
    onClick: () => void
    children: ReactNode
    isLoading?: boolean
}

const buttonClass = cva(
    [
        "px-10 md:py-3 py-2 rounded-md outline-0 text-xl md:text-2xl font-semibold shadow-lg shadow-black/50 hover:scale-105 active:scale-95 transition-all",
    ],
    {
        variants: {
            variant: {
                primary: ["bg-dPri text-white "],
                secondary: ["bg-black text-dPri"],
            },

            width: {
                true: ["w-full"],
            },

            disabled: {
                true: ["hover:scale-100 active:scale-100 cursor-not-allowed"],
            },
        },

        defaultVariants: {
            variant: "primary",
            disabled: false,
        },

        compoundVariants: [
            {
                variant: "primary",
                disabled: true,
                className: ["bg-dPri/50  text-gray-400"],
            },
        ],
    }
)

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
