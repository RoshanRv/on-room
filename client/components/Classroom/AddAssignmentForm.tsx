import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ClickButton } from "@components/Button/Button"
import { omit } from "lodash"
import omitEmptyValues from "@utils/omitEmptyValues"
import {
    AssignmentSchemaInput,
    createAssignmentSchema,
} from "@schema/assignment.schema"
import Form from "@components/Form/Form"

const AddAssignmentForm = ({
    toggleOn,
    classroomId,
}: {
    toggleOn: () => void
    classroomId: string
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<AssignmentSchemaInput>({
        resolver: zodResolver(createAssignmentSchema),
    })

    const temp = {} as AssignmentSchemaInput

    const queryClient = useQueryClient()

    const mutateFunc = async (
        data: Partial<AssignmentSchemaInput & { classroomId: string }>
    ) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment`,
            data,
            {
                withCredentials: true,
            }
        )
    }

    const { mutate } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignment"] })
        },
    })

    const handleAddAssignment = (e: AssignmentSchemaInput) => {
        mutate(omitEmptyValues({ ...e, classroomId }))

        reset({
            description: "",
            name: "",
        })
        toggleOn()
    }

    return (
        <>
            {" "}
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                New Assignement
            </h1>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                <Form
                    errors={errors}
                    inputs={[
                        {
                            inputName: "name",
                            inputType: "text",
                        },
                        {
                            inputName: "description",
                            inputType: "textarea",
                        },
                        {
                            inputName: "dueDate",
                            inputType: "date",
                            options: {
                                min: new Date().toISOString().slice(0, 10),
                            },
                        },
                    ]}
                    register={register}
                    schemaType={temp}
                />

                {/*    Add Btn  */}
                <ClickButton
                    onClick={handleSubmit(handleAddAssignment)}
                    size={"small"}
                >
                    <h1>Add Assignment</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default AddAssignmentForm
