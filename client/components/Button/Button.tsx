import { cva, VariantProps } from "class-variance-authority"
import Link from "next/link"
import { ReactNode } from "react"

type ClickButtonProp = VariantProps<typeof buttonClass> & {
    onClick: () => void
    children: ReactNode
    isLoading?: boolean
    className?: string
}

type LinkButtonProp = VariantProps<typeof buttonClass> & {
    children: ReactNode
    isLoading?: boolean
    link: string
}

const buttonClass = cva(
    [
        " rounded-md outline-0 text-white font-semibold shadow-lg shadow-black/50  transition-all",
    ],
    {
        variants: {
            variant: {
                primary: ["bg-dPri border-2 border-black/70  "],
                secondary: ["border-2 border-dPri bg-black"],
                danger: ["bg-danger border-2 border-dPri "],
            },

            width: {
                true: ["w-full"],
            },

            disabled: {
                true: ["hover:scale-100 active:scale-100 cursor-not-allowed"],
            },
            size: {
                small: ["px-8 md:py-2 py-1 text-lg md:text-xl"],
                large: ["px-10 md:py-3 py-2 text-xl md:text-2xl"],
                logo: ["p-1 md:px-8 md:py-2 md:text-xl "],
            },
        },

        defaultVariants: {
            variant: "primary",
            disabled: false,
            size: "large",
        },

        compoundVariants: [
            {
                variant: "primary",
                disabled: true,
                className: ["bg-dPri/50  text-gray-400"],
            },
            {
                variant: "secondary",
                disabled: true,
                className: ["bg-gray-700  text-gray-300/60 border-dPri/70  "],
            },
            {
                variant: ["secondary", "primary", "danger"],
                disabled: false,
                className: ["hover:scale-105 active:scale-95"],
            },
        ],
    }
)

export const ClickButton = ({
    variant,
    width,
    disabled = false,
    onClick,
    children,
    size,
    isLoading = false,
    className,
}: ClickButtonProp) => {
    return (
        <button
            disabled={disabled as boolean}
            className={buttonClass({
                variant,
                width,
                disabled,
                size,
                className,
            })}
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

export const LinkButton = ({
    variant,
    width,
    disabled = false,
    link,
    children,
    size,
    isLoading = false,
}: LinkButtonProp) => {
    return (
        <Link href={`/${link}`}>
            <button
                disabled={disabled as boolean}
                className={buttonClass({ variant, width, disabled, size })}
            >
                {!isLoading ? (
                    children
                ) : (
                    <div className="w-6 h-6 mx-auto border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                )}
            </button>
        </Link>
    )
}
