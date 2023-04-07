import React, { ReactNode } from "react"
import { IoChevronBack } from "react-icons/io5"
import { useRouter } from "next/navigation"

interface Props {
    title: string | undefined
    children?: ReactNode
    backBtn?: boolean
    sub?: boolean
}

const MainTitle = ({ title, children, backBtn, sub }: Props) => {
    const router = useRouter()
    return (
        <div className="flex items-baseline justify-between pb-4 border-b border-dPri flex-wrap gap-y-2 ">
            <div className="flex md:gap-x-6 items-center gap-x-2 ">
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
                <h1
                    className={` ${
                        sub ? "text-xl lg:text-3xl" : "text-2xl lg:text-4xl"
                    }  font-semibold  text-dPri`}
                >
                    {title}
                </h1>
            </div>

            {children}
        </div>
    )
}

export default MainTitle
