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
        console.log(e)

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
                {/*     Title     */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.name && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.name.message as string}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("name")}
                    />
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Name
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

                {/* Due Date and */}
                <div className="flex items-end gap-x-2">
                    <div className="flex flex-col-reverse justify-end w-full">
                        {errors.dueDate && (
                            <p className="p-1 text-base text-red-500 capitalize ">
                                {errors.dueDate.message as string}
                            </p>
                        )}
                        <input
                            type="date"
                            placeholder="Date"
                            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                            {...register("dueDate")}
                        />
                        <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                            Image Url
                        </h1>
                    </div>
                </div>
                {/*    Add Btn  */}
                <ClickButton onClick={handleSubmit(handleAddAssignment)}>
                    <h1>Add Assignment</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default AddAssignmentForm
