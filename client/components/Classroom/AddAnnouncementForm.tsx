import { ClickButton } from "@components/Button/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    AnnouncementSchemaInput,
    createAnnouncementSchema,
} from "@schema/announcement.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"

interface Prop {
    toggleOn: () => void
    classroomId: string
}

const AddAnnouncementForm = ({ classroomId, toggleOn }: Prop) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<AnnouncementSchemaInput>({
        resolver: zodResolver(createAnnouncementSchema),
    })

    const mutateFunc = async (
        data: AnnouncementSchemaInput & { classroomId: string }
    ) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/announcement`,
            data,
            {
                withCredentials: true,
            }
        )
    }

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcement"] })
        },
    })

    const handleAddAnnouncement = (e: AnnouncementSchemaInput) => {
        mutate({ ...e, classroomId })

        reset({
            description: "",
            title: "",
        })
        toggleOn()
    }

    return (
        <>
            {" "}
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                New Announcement
            </h1>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                {/*     Title     */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.title && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.title.message as string}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="title"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("title")}
                    />
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Title
                    </h1>
                </div>
                {/*     Description    */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.description && (
                        <p className="p-1 overflow-auto text-base text-red-500 capitalize resize-none">
                            {errors.description.message as string}
                        </p>
                    )}
                    <textarea
                        placeholder="Description"
                        rows={1}
                        className="w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("description")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Description
                    </h1>
                </div>

                {/*    Add Btn  */}
                <ClickButton
                    onClick={handleSubmit(handleAddAnnouncement)}
                    size={"small"}
                >
                    <h1>Add Annoucement</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default AddAnnouncementForm
