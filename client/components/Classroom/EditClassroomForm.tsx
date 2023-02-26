import { ClickButton } from "@components/Button/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { classroomSchema, ClassroomSchemaInput } from "@schema/dashboard.schema"
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

const EditClassroomForm = ({ toggleOn }: { toggleOn: () => void }) => {
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const [classroom, setClassroom] = useState<ClassroomProps>()
    const [imgUrl, setImgUrl] = useState<string | undefined>()

    useEffect(() => {
        // Create an observer to watch the query and update its result into state
        const observer = new QueryObserver(queryClient, {
            queryKey: ["classroom", id],
            enabled: false,
            retry: 1,
        })
        const unsubscribe = observer.subscribe((queryResult: any) => {
            setClassroom(queryResult?.data?.data)
        })

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [queryClient])

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
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<ClassroomSchemaInput>({
        resolver: zodResolver(classroomSchema),
    })

    useEffect(() => {
        if (classroom) {
            setValue("title", classroom?.title)
            setValue("description", classroom?.description)
            setValue("img", classroom?.img)
            setImgUrl(classroom?.img)
        }
    }, [classroom])

    const handleEdit = (e: ClassroomSchemaInput) => {
        mutate(omitEmptyValues(e))
        toggleOn()
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-center md:text-2xl text-dPri lg:text-3xl">
                Edit Classroom
            </h1>
            {/* classroom Img */}
            <div className="w-full h-40 my-6 border rounded-md shadow-md md:h-60 border-dPri shadow-black/20">
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
                    {errors.title && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.title.message as string}
                        </p>
                    )}
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

                {/* Img and */}
                <div className="flex items-end gap-x-2">
                    <div className="flex flex-col-reverse justify-end w-full">
                        {errors.img && (
                            <p className="p-1 text-base text-red-500 capitalize ">
                                {errors.img.message as string}
                            </p>
                        )}
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
                <ClickButton onClick={handleSubmit(handleEdit)}>
                    <h1>Edit Classroom</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default EditClassroomForm
