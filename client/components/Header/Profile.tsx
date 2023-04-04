import useToast from "@store/useToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import setErrorMsg from "@utils/setErrorMsg"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const Profile = ({ user }: { user: UserProps }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const setToast = useToast((state) => state.setToast)

    //  Logout Mutation
    const { mutate: logout } = useMutation({
        mutationFn: () => {
            return axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                {
                    withCredentials: true,
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
            setToast({
                msg: "Logged Out Successfully",
                variant: "success",
            })
            router.push("/signin")
        },

        onError: (e: AxiosError) => {
            setToast({
                msg: setErrorMsg(e.response!),
                variant: "error",
            })
        },
    })

    return (
        <div className="relative  group ">
            <div className="w-12 h-12 border-2 rounded-full cursor-pointer border-dPri">
                {/* img */}
                <img
                    src={user.img}
                    alt="profile_pic"
                    className="w-full h-full rounded-full"
                />
                {/*   Dropdown   */}
                <div
                    className={` shadow-md shadow-black/50 absolute flex left-0 flex-col p-3 px-5 md:px-6 translate-y-5 bg-white dark:bg-gray-900 -translate-x-[25%] -z-10 top-full origin-top text-gray-400 rounded-md gap-y-2 transition-all group-hover:scale-100 scale-0  text-lg md:text-auto `}
                >
                    {/*    Name - Role  */}
                    <h1 className="text-dPri">{user.name}</h1>
                    <hr className="border border-dPri" />
                    <Link href={"/profile"}>
                        <h1 className="transition-all hover:text-dPri">
                            Profile
                        </h1>
                    </Link>
                    <h1
                        onClick={() => logout()}
                        className="transition-all hover:text-dPri"
                    >
                        Logout
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Profile
