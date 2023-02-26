import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import Card from "./Card"

const Announcement = ({ classroomId }: { classroomId: string | null }) => {
    const { data: announcements } = useQuery({
        queryKey: ["announcement"],
        queryFn: () =>
            axios.get<Announcement[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/announcement/${classroomId}`,
                {
                    withCredentials: true,
                }
            ),
    })

    return (
        <section className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
            {announcements?.data.map((announcement, i) => (
                <Card key={i} announcement={announcement} />
            ))}
        </section>
    )
}

export default Announcement
