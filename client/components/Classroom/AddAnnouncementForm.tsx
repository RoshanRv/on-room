import { ClickButton } from "@components/Button/Button"
import Form from "@components/Form/Form"
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

    const temp = {} as AnnouncementSchemaInput

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
                <Form
                    errors={errors}
                    inputs={[
                        {
                            inputName: "title",
                            inputType: "text",
                        },
                        {
                            inputName: "description",
                            inputType: "textarea",
                        },
                    ]}
                    schemaType={temp}
                    register={register}
                />

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
