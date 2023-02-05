import { UserResponse } from "@components/Header/Header"
import UpdateCard from "@components/Profile/UpdateCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useState } from "react"

export interface UserDetailsType {
    name: string
    img: string
}

const profile = () => {
    const { data: user } = useQuery<UserResponse>({
        queryKey: ["users"],
        queryFn: () =>
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
                withCredentials: true,
            }),
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess(data) {
            setUserDetails({ name: data.data.name, img: data.data.img })
        },
    })

    const [userDetails, setUserDetails] = useState({} as UserDetailsType)

    if (user)
        return (
            <main className="bg bg-gray-100 dark:bg-back  flex items-center justify-center flex-1 w-full h-full px-3 py-10 flex-col md:px-10 ">
                {/*      Profile Update Card    */}
                <UpdateCard
                    setUserDetails={setUserDetails}
                    user={user.data}
                    userDetails={userDetails}
                />
            </main>
        )
}

export default profile
