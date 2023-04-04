import { ClickButton } from "@components/Button/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    AssignmentSchemaInput,
    createAssignmentSchema,
} from "@schema/assignment.schema"
import {
    QueryObserver,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query"
import omitEmptyValues from "@utils/omitEmptyValues"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const EditAssignmentForm = ({ toggleOn }: { toggleOn: () => void }) => {
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const assignmentId = searchParams.get("assignmentId")
    const [assignment, setAssignment] = useState<AssignmentProps>()

    useEffect(() => {
        // Create an observer to watch the query and update its result into state
        const observer = new QueryObserver(queryClient, {
            queryKey: ["assignment", assignmentId],
            enabled: false,
            retry: 1,
        })
        const unsubscribe = observer.subscribe((queryResult: any) => {
            setAssignment(queryResult?.data?.data)
        })

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [queryClient])

    const { mutate } = useMutation({
        mutationFn: (data: Partial<AssignmentSchemaInput>) =>
            axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/assignment/${assignmentId}`,
                data,
                {
                    withCredentials: true,
                }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries(["assignment", assignmentId])
        },
    })

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<AssignmentSchemaInput>({
        resolver: zodResolver(createAssignmentSchema),
    })

    useEffect(() => {
        if (assignment) {
            setValue("name", assignment.name)
            setValue("description", assignment?.description)
            setValue("dueDate", assignment?.dueDate)
        }
    }, [assignment])

    const handleEdit = (e: AssignmentSchemaInput) => {
        mutate(omitEmptyValues(e))
        toggleOn()
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                Edit Assignment
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
                        placeholder="Name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("name")}
                    />
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Assignment Name
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
                            placeholder="Due Date"
                            min={new Date().toISOString().slice(0, 10)}
                            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                            {...register("dueDate")}
                        />
                        <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                            Due Date
                        </h1>
                    </div>
                </div>
                {/*    Add Btn  */}
                <ClickButton onClick={handleSubmit(handleEdit)}>
                    <h1>Update Assignment</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default EditAssignmentForm
