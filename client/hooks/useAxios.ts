import React, { useState } from "react"

const useAxios = (url: string, cookie: boolean, payload: Object) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    return {}
}

export default useAxios
