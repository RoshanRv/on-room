import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { classroomSchema, ClassroomSchemaInput } from "@schema/dashboard.schema"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ClickButton } from "@components/Button/Button"
import omitEmptyValues from "@utils/omitEmptyValues"
import Image from "next/image"
import Form from "@components/Form/Form"

const AddClassroomForm = ({ toggleOn }: { toggleOn: () => void }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm<ClassroomSchemaInput>({
        resolver: zodResolver(classroomSchema),
    })

    const imgUrl = watch("img", "")

    const queryClient = useQueryClient()

    const mutateFunc = async (data: Partial<ClassroomSchemaInput>) => {
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classrooms"] })
        },
    })

    const handleAddClassroom = (e: ClassroomSchemaInput) => {
        mutate(omitEmptyValues(e))

        reset({
            description: "",
            img: "",
            title: "",
        })
        toggleOn()
    }

    const temp = {} as ClassroomSchemaInput

    return (
        <>
            {" "}
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                New Classroom
            </h1>
            {/* classroom Img */}
            <div className="w-full h-40 my-6 border rounded-md shadow-md md:h-60 border-dPri shadow-black/20 relative ">
                <Image
                    src={imgUrl || ""}
                    alt=" Enter Valid Img URL"
                    className="w-full h-full rounded-md"
                    fill
                />
            </div>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                <Form
                    errors={errors}
                    register={register}
                    schemaType={temp}
                    inputs={[
                        {
                            inputName: "title",
                            inputType: "text",
                        },
                        {
                            inputName: "description",
                            inputType: "textarea",
                        },
                        {
                            inputName: "img",
                            inputType: "url",
                        },
                    ]}
                />

                {/*    Add Btn  */}
                <ClickButton onClick={handleSubmit(handleAddClassroom)}>
                    <h1>Add Classroom</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default AddClassroomForm
