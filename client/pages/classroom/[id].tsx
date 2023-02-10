import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React from "react"

const Classroom = () => {
    const searchParams = useSearchParams().get("id")

    const { data } = useQuery({
        queryKey: ["classroom", "id"],
        queryFn: () => axios.get(`${process.env.SERVER_ENDPOINT}/api/`),
    })

    return <div>Classroom</div>
}

export default Classroom
