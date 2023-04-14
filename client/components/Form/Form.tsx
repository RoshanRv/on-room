import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { FieldErrorsImpl, UseFormRegister, Path } from "react-hook-form"

interface InputProps<T> {
    inputName: keyof T
    inputType: "text" | "password" | "date" | "email" | "url" | "textarea"
    options?: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
}

interface Props<T extends { [key: string]: any }> {
    schemaType: T
    inputs: Array<InputProps<T>>
    register: UseFormRegister<T>
    errors: Partial<FieldErrorsImpl<T>>
}

const Form = <T extends { [key: string]: any }>({
    inputs,
    errors,
    register,
}: Props<T>) => {
    const isInput = (
        type: "text" | "password" | "date" | "email" | "url" | "textarea"
    ) => {
        if (type === "textarea") return false
        return true
    }

    return (
        <div className="flex flex-col mt-4 gap-y-6">
            {inputs.map((input, i) => (
                <div
                    key={i}
                    className="flex flex-col-reverse justify-end w-full "
                >
                    {errors[input.inputName] && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors[input.inputName]?.message as string}
                        </p>
                    )}
                    {isInput(input.inputType) ? (
                        <input
                            {...input.options}
                            type={input.inputType}
                            placeholder={input.inputName as string}
                            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                            {...register(input.inputName as Path<T>)}
                        />
                    ) : (
                        <textarea
                            placeholder={input.inputName as string}
                            rows={1}
                            className="w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                            {...register(input.inputName as Path<T>)}
                        />
                    )}
                    <h1 className="mb-1 text-sm transition-all text-dPri peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 capitalize">
                        {input.inputName as string}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default Form
