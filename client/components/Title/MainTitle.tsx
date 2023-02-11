import React, { ReactNode } from "react"

interface Props {
    title: string | undefined
    children?: ReactNode
}

const MainTitle = ({ title, children }: Props) => {
    return (
        <div className="flex items-baseline justify-between pb-4 border-b border-dPri">
            <h1 className="text-2xl font-semibold lg:text-4xl text-dPri">
                {title}
            </h1>
            {children}
        </div>
    )
}

export default MainTitle
