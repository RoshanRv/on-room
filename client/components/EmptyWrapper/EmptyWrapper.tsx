import React, { ReactNode } from "react"
import { isEmpty } from "lodash"

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
                    <h1>{noDataText}</h1>
                </div>
            )}
        </>
    )
}

export default EmptyWrapper
