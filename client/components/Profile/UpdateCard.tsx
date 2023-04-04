import { ClickButton } from "@components/Button/Button"
import useToast from "@store/useToast"
import { useMutation } from "@tanstack/react-query"
import setErrorMsg from "@utils/setErrorMsg"
import axios, { AxiosError } from "axios"
import { UserDetailsType } from "pages/profile"
import React, { useState } from "react"

interface UpdateCardProps {
    user: UserProps
    userDetails: UserDetailsType
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsType>>
}

const UpdateCard = ({ user, userDetails, setUserDetails }: UpdateCardProps) => {
    const [userDetailsError, setUserDetailsError] = useState({
        name: "",
        img: "",
    })

    const handleUpdate = () => {
        if (!userDetails.name.trim())
            return setUserDetailsError((e) => ({
                ...e,
                name: "Name is Required",
            }))
        else
            setUserDetailsError((e) => ({
                ...e,
                name: "",
            }))

        if (!userDetails.img.trim())
            return setUserDetailsError((e) => ({
                ...e,
                img: "Image URL is Required",
            }))
        else
            setUserDetailsError((e) => ({
                ...e,
                img: "",
            }))

        mutate(userDetails)
    }

    const setToast = useToast((state) => state.setToast)

    const { mutate } = useMutation({
        mutationFn: (data: { name: string; img: string }) =>
            axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                data,
                { withCredentials: true }
            ),

        onSuccess: () => {
            setToast({
                msg: "Profile Updated",
                variant: "success",
            })
        },

        onError: (e: AxiosError) => {
            setToast({
                msg: setErrorMsg(e.response!),
                variant: "error",
            })
        },
    })

    return (
        <div className="p-6 mx-auto rounded-md shadow-md w-max bg-gray-200 dark:bg-gray-800 flex flex-col gap-y-4">
            <h1 className="text-3xl text-dPri font-semibold">Update Details</h1>
            {/*   Name  & DP */}
            <div className="flex justify-between items-center gap-x-8">
                {/*    Name  */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {userDetailsError.name.length > 0 && (
                        <p className="text-red-600 py-1">
                            {userDetailsError.name}
                        </p>
                    )}

                    <input
                        type="text"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        value={userDetails.name}
                        onChange={(e) =>
                            setUserDetails((pre) => ({
                                ...pre,
                                name: e.target.value,
                            }))
                        }
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Name
                    </h1>
                </div>
                {/*       DP   */}
                <div className="rounded-full border-2 w-28 h-20 border-dPri overflow-hidden">
                    <img
                        src={userDetails.img}
                        alt=""
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/*     Email     */}
            <div className="flex flex-col-reverse justify-end w-full">
                <input
                    type="email"
                    placeholder="email"
                    readOnly
                    className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-transparent border-dPri/70 placeholder-shown:bg-transparent focus:bg-transparent font-sm "
                    value={user.email}
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                    Email
                </h1>
            </div>

            {/*    Img    */}
            <div className="flex flex-col-reverse justify-end w-full">
                {userDetailsError.img.length > 0 && (
                    <p className="text-red-600 py-1">{userDetailsError.img}</p>
                )}
                <input
                    type="text"
                    placeholder="img"
                    className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                    value={userDetails.img}
                    onChange={(e) =>
                        setUserDetails((pre) => ({
                            ...pre,
                            img: e.target.value,
                        }))
                    }
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                    Image URL
                </h1>
            </div>

            {/*     Role     */}
            <div className="flex flex-col-reverse justify-end w-full">
                <input
                    type="text"
                    placeholder="role"
                    readOnly
                    className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-transparent border-dPri/70 placeholder-shown:bg-transparent focus:bg-transparent font-sm "
                    value={user.role}
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                    Role
                </h1>
            </div>
            <ClickButton onClick={handleUpdate}>
                <h1>Update</h1>
            </ClickButton>
        </div>
    )
}

export default UpdateCard
