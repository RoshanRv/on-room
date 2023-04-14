import { ClickButton } from "@components/Button/Button"
import Form from "@components/Form/Form"
import { SignInInputProps } from "@schema/signin.schema"
import React from "react"
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors"
import {
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form/dist/types/form"
import { IoChevronBack } from "react-icons/io5"

interface SignInProps {
    role: Role
    errors: Partial<FieldErrorsImpl<SignInInputProps>>
    register: UseFormRegister<SignInInputProps>
    handleSubmit: UseFormHandleSubmit<SignInInputProps>
    handleBack: () => void
    handleSignIn: (e: SignInInputProps) => void
}

const SignIn = ({
    role,
    errors,
    register,
    handleBack,
    handleSignIn,
    handleSubmit,
}: SignInProps) => {
    const temp = {} as SignInInputProps
    return (
        <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-200 rounded-md shadow-md dark:bg-gray-800 shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
            {/* back btn */}
            <button
                onClick={handleBack}
                className="absolute p-2 bg-gray-100 rounded-full dark:bg-gray-900 top-6 left-4"
            >
                <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
            </button>

            <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-dPri">
                Sign In As {role || " "}
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
                    ]}
                    register={register}
                />

                {/*      btn    */}
                <ClickButton onClick={handleSubmit(handleSignIn)} width>
                    <h1>Sign In</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default SignIn
