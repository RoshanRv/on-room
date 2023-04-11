import React from "react"

type Props = {}

const Spinner = (props: Props) => {
    return (
        <div className="w-10 h-10 bg-transparent border-2 border-dPri border-t-transparent rounded-full animate-spin mx-auto my-8" />
    )
}

export default Spinner
