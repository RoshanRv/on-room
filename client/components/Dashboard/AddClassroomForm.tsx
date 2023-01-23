import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { classroomSchema } from "@schema/dashboard.schema"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ClickButton } from "@components/Button/Button"

const AddClassroomForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(classroomSchema),
    })

    const mutateFunc = async <T extends unknown>(data: T) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom`,
            data,
            {
                withCredentials: true,
            }
        )
    }

    const { mutate } = useMutation({
        mutationFn: mutateFunc,
    })

    const handleAddClassroom = (e: any) => {
        mutate(e)
    }

    const [imgUrl, setImgUrl] = useState("")

    return (
        <>
            {" "}
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                New Classroom
            </h1>
            {/* classroom Img */}
            <div className="w-full h-40 my-8 border rounded-md shadow-md md:h-60 border-dPri shadow-black/20">
                <img
                    src={imgUrl}
                    alt="classroom_img"
                    className="w-full h-full rounded-md"
                />
            </div>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                {/*     Title     */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {/* {errors.title && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.title.message}
                        </p>
                    )} */}
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("title")}
                    />
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Title
                    </h1>
                </div>
                {/*     Description    */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {/* {errors.description && (
            <p className="p-1 text-base text-red-500 capitalize ">
                {errors.description.message}
            </p>
        )} */}
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("description")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Description
                    </h1>
                </div>

                {/* Img and */}
                <div className="flex items-end gap-x-2">
                    <div className="flex flex-col-reverse justify-end w-full">
                        {/* {errors.img && (
    <p className="p-1 text-base text-red-500 capitalize ">
        {errors.img.message}
    </p>
)} */}
                        <input
                            type="text"
                            placeholder="imageUrl"
                            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                            {...register("img", {
                                onChange: (e) => setImgUrl(e.target.value),
                            })}
                        />
                        <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                            Image Url
                        </h1>
                    </div>
                </div>
                {/*    Add Btn  */}
                <ClickButton onClick={handleSubmit(handleAddClassroom)}>
                    <h1>Add Classroom</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default AddClassroomForm
