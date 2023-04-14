import { ClickButton } from "@components/Button/Button"
import Form from "@components/Form/Form"
import { SignUp1InputProps } from "@schema/signup.schema"
import React from "react"
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors"
import {
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form/dist/types/form"
import { IoChevronBack } from "react-icons/io5"

interface SignUp1Props {
    role: Role
    errors: Partial<FieldErrorsImpl<SignUp1InputProps>>
    register: UseFormRegister<SignUp1InputProps>
    handleSubmit: UseFormHandleSubmit<SignUp1InputProps>
    handleBack: () => void
    handleNext: () => void
}

const SignUp1 = ({
    role,
    errors,
    register,
    handleBack,
    handleNext,
    handleSubmit,
}: SignUp1Props) => {
    const temp = {} as SignUp1InputProps

    return (
        <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-200 dark:bg-gray-800 rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
            {/* back btn */}
            <button
                onClick={handleBack}
                className="absolute p-2 bg-white dark:bg-gray-900 rounded-full top-6 left-4"
            >
                <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
            </button>

            <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-dPri">
                Sign Up As {role || " "}
            </h1>

            {/*         Form Div  */}
            <div className="flex flex-col mt-1 text-left gap-y-10 ">
                <Form
                    errors={errors}
                    schemaType={temp}
                    inputs={[
                        {
                            inputName: "email",
                            inputType: "email",
                        },
                        {
                            inputName: "password",
                            inputType: "password",
                        },
                        {
                            inputName: "confirmPassword",
                            inputType: "password",
                        },
                    ]}
                    register={register}
                />

                {/*      btn    */}
                <ClickButton onClick={handleSubmit(handleNext)} width>
                    <h1>Next</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default SignUp1
