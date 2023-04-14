import UpdateCard from "@components/Profile/UpdateCard"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"
import React, { useState } from "react"

export interface UserDetailsType {
    name: string
    img: string
}

const profile = () => {
    const { data: user } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const axios = (await import("axios")).default
            return axios.get<UserProps>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
                {
                    withCredentials: true,
                }
            )
        },
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess(data) {
            setUserDetails({ name: data.data.name, img: data.data.img })
        },
    })

    const [userDetails, setUserDetails] = useState({} as UserDetailsType)

    if (user)
        return (
            <>
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>OnRoom | Profile</title>
                    <meta
                        name="description"
                        content="Connecting classrooms with OnRoom"
                    />

                    {/* <!-- Google / Search Engine Tags --> */}
                    <meta itemProp="name" content="OnRoom | Profile" />
                    <meta
                        itemProp="description"
                        content="Connecting classrooms with OnRoom"
                    />
                    <meta itemProp="image" content="meta.png" />

                    {/* <!-- Facebook Meta Tags --> */}
                    <meta
                        property="og:url"
                        content="https://portfolio-roshanrv.vercel.app"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="OnRoom | Profile" />
                    <meta
                        property="og:description"
                        content="Connecting classrooms with OnRoom"
                    />
                    <meta property="og:image" content="meta.png" />

                    {/* <!-- Twitter Meta Tags --> */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="OnRoom | Profile" />
                    <meta
                        name="twitter:description"
                        content="Connecting classrooms with OnRoom"
                    />
                    <meta name="twitter:image" content="meta.png" />
                </Head>
                <main className="bg bg-gray-100 dark:bg-back  flex items-center justify-center flex-1 w-full h-full px-3 py-10 flex-col md:px-10 ">
                    {/*      Profile Update Card    */}
                    <UpdateCard
                        setUserDetails={setUserDetails}
                        user={user.data}
                        userDetails={userDetails}
                    />
                </main>
            </>
        )
}

export default profile
