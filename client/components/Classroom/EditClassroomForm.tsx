import { ClickButton } from "@components/Button/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { classroomSchema, ClassroomSchemaInput } from "@schema/dashboard.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import omitEmptyValues from "@utils/omitEmptyValues"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import Image from "next/image"
import Form from "@components/Form/Form"

const EditClassroomForm = ({
    toggleOn,
    classroom,
}: {
    toggleOn: () => void
    classroom: ClassroomProps | undefined
}) => {
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const { mutate } = useMutation({
        mutationFn: (data: Partial<ClassroomSchemaInput>) =>
            axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/classroom/${classroom?.id}`,
                data,
                {
                    withCredentials: true,
                }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries(["classroom", id])
        },
    })

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<ClassroomSchemaInput>({
        resolver: zodResolver(classroomSchema),
        defaultValues: {
            title: classroom?.title,
            description: classroom?.description,
            img: classroom?.img,
        },
    })

    const imgUrl = watch("img", classroom?.img)

    const handleEdit = (e: ClassroomSchemaInput) => {
        mutate(omitEmptyValues(e))
        toggleOn()
    }

    const temp = {} as ClassroomSchemaInput

    return (
        <div>
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                Edit Classroom
            </h1>
            {/* classroom Img */}
            <div className="w-full h-40 relative my-6 border rounded-md shadow-md md:h-60 border-dPri shadow-black/20">
                <Image
                    src={imgUrl || ""}
                    alt="classroom_img"
                    className="w-full h-full rounded-md"
                    fill
                />
            </div>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                <Form
                    schemaType={temp}
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
                        {
                            inputName: "img",
                            inputType: "url",
                        },
                    ]}
                    register={register}
                />

                {/*    Add Btn  */}
                <ClickButton onClick={handleSubmit(handleEdit)}>
                    <h1>Edit Classroom</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default EditClassroomForm
