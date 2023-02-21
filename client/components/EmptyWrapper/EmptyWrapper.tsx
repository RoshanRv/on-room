import React, { ReactNode } from "react"
import { isEmpty } from "lodash"
import Image from "next/image"
import WRAPPER from "@public/wrapper_img.png"
import TEACHER_IMG from "@public/teacher_role.jpeg"

interface Props {
    data: any
    children: ReactNode
    noDataText: string
}

const EmptyWrapper = ({ data, children, noDataText }: Props) => {
    isEmpty(data)

    return (
        <>
            {!isEmpty(data) ? (
                children
            ) : (
                <div className="my-8 text-center text-xl">
                    <h1 className="text-gray-800 dark:text-gray-300">
                        {noDataText}
                    </h1>
                    <Image
                        src={WRAPPER}
                        alt="Wrapper_Image"
                        className="mx-auto"
                    />
                </div>
            )}
        </>
    )
}

export default EmptyWrapper
