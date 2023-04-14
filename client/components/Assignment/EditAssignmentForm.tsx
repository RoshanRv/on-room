import { ClickButton } from "@components/Button/Button"
import Form from "@components/Form/Form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    AssignmentSchemaInput,
    createAssignmentSchema,
} from "@schema/assignment.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import omitEmptyValues from "@utils/omitEmptyValues"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

const EditAssignmentForm = ({
    toggleOn,
    assignment,
}: {
    toggleOn: () => void
    assignment: AssignmentProps | undefined
}) => {
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const assignmentId = searchParams.get("assignmentId")

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
        formState: { errors },
        handleSubmit,
    } = useForm<AssignmentSchemaInput>({
        resolver: zodResolver(createAssignmentSchema),
        defaultValues: {
            name: assignment?.name,
            description: assignment?.description,
            dueDate: assignment?.dueDate,
        },
    })

    const temp = {} as AssignmentSchemaInput

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
                <ClickButton onClick={handleSubmit(handleEdit)}>
                    <h1>Update Assignment</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default EditAssignmentForm
