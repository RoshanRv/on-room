import { ClickButton } from "@components/Button/Button"
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
    return (
        <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-800 rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
            {/* back btn */}
            <button
                onClick={handleBack}
                className="absolute p-2 bg-gray-900 rounded-full top-6 left-4"
            >
                <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
            </button>

            <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-dPri">
                Sign Up As {role || " "}
            </h1>

            {/*         Form Div  */}
            <div className="flex flex-col mt-1 text-left gap-y-10 ">
                {/*     Email     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.email && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.email.message}
                        </p>
                    )}
                    <input
                        type="email"
                        placeholder="email"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("email")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Email
                    </h1>
                </div>

                {/*     Password     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.password && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.password.message}
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("password")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Password
                    </h1>
                </div>

                {/*     Confirm Password     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.confirmPassword && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="c-password"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                        {...register("confirmPassword")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-dPri text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Confirm Password
                    </h1>
                </div>

                {/*      btn    */}
                <ClickButton onClick={handleSubmit(handleNext)} width>
                    <h1>Next</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default SignUp1
