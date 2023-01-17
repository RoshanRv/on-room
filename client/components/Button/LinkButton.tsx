import buttonClass from "@utils/buttonClass"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import { ReactNode } from "react"

export type LinkButtonProp = VariantProps<typeof buttonClass> & {
    children: ReactNode
    isLoading?: boolean
    link: string
}

const LinkButton = ({
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

export default LinkButton
