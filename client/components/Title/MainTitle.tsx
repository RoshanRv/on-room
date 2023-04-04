import React, { ReactNode } from "react"
import { IoChevronBack } from "react-icons/io5"
import { useRouter } from "next/navigation"

interface Props {
    title: string | undefined
    children?: ReactNode
    backBtn?: boolean
}

const MainTitle = ({ title, children, backBtn }: Props) => {
    const router = useRouter()
    return (
        <div className="flex items-baseline justify-between pb-4 border-b border-dPri">
            <div className="flex md:gap-x-6">
                {/* back btn */}
                {backBtn && (
                    <button
                        onClick={() => router.back()}
                        className=" p-2 bg-white dark:bg-gray-800 shadow-md   rounded-full"
                    >
                        <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
                    </button>
                )}
                {/*   Title   */}
                <h1 className="text-2xl font-semibold lg:text-4xl text-dPri">
                    {title}
                </h1>
            </div>

            {children}
        </div>
    )
}

export default MainTitle
