import { ClassroomSchemaInput } from "@schema/dashboard.schema"
import React from "react"
import { FieldErrorsImpl, UseFormRegister, FieldValues } from "react-hook-form"
import { ZodTypeAny } from "zod"

interface Props<T extends FieldValues> {
    schemaType: T
    inputs: ["title", "img"]
    register: UseFormRegister<T>
    errors: Partial<FieldErrorsImpl<T>>
}

const Form = <T extends FieldValues>({
    inputs,
    errors,
    register,
}: Props<T>) => {
    return (
        <div className="flex flex-col mt-4 gap-y-6">
            {inputs.map((input) => (
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors[input] && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors[input]?.message as string}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register(input)}
                    />
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 capitalize">
                        {input}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default Form
