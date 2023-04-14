import { useQuery } from "@tanstack/react-query"
import React from "react"
import Card from "./Card"

const Announcement = ({ classroomId }: { classroomId: string | null }) => {
    const { data: announcements } = useQuery({
        queryKey: ["announcement"],
        queryFn: async () => {
            const axios = (await import("axios")).default
            return axios.get<Announcement[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/announcement/${classroomId}`,
                {
                    withCredentials: true,
                }
            )
        },
    })

    return (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {announcements?.data.map((announcement, i) => (
                <Card key={i} announcement={announcement} />
            ))}
        </section>
    )
}

export default Announcement
