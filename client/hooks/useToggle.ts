import React, { useState } from "react"

const useToggle = (initialState = false) => {
    const [isOn, setIsOn] = useState(initialState)

    const toggleOn = () => setIsOn((e) => !e)

    return { isOn, toggleOn }
}

export default useToggle
