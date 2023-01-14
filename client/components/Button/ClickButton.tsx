import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

export type ClickButtonProp = VariantProps<typeof buttonClass> & {
    onClick: () => void
    children: ReactNode
}

const buttonClass = cva(
    [
        "px-10 py-3 rounded-md outline-0 text-xl md:text-2xl font-semibold shadow-lg shadow-black/50 hover:scale-105 active:scale-95 transition-all",
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
}: ClickButtonProp) => {
    return (
        <button
            disabled={disabled as boolean}
            className={buttonClass({ variant, width, disabled })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ClickButton
