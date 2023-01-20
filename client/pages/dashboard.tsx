import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    dehydrate,
    QueryClient,
    useQuery,
    QueryObserver,
    useQueryClient,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { UserResponse } from "@components/Header/Header"
import { queryClient } from "./_app"

const dashboard = () => {
    const router = useRouter()

    const { data: user, isError } = useQuery<UserResponse>({
        queryKey: ["users"],
        queryFn: () =>
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
                withCredentials: true,
            }),
    })

    if (isError) router.push("/signin")

    return <div>dashboard</div>
}

export default dashboard

export const getServerSideProps = async ({
    res,
    req,
}: {
    res: any
    req: any
}) => {
    try {
        const user = await queryClient.fetchQuery(["users"], () =>
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`, {
                headers: {
                    Cookie: req.headers.cookie,
                },
            })
        )

        return {
            props: {
                user: user.data,
            },
        }
    } catch (e) {
        console.log(e)

        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        }
    }
}
