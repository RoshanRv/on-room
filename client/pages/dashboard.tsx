import axios from "axios"
import React from "react"
import { getCookies, setCookie } from "cookies-next"

const dashboard = ({ user }: { user: UserProps }) => {
    console.log(user)

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
        const user = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
            {
                headers: {
                    Cookie: req.headers.cookie,
                },
            }
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
