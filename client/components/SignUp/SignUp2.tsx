import { ClickButton } from "@components/Button/Button"
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors"
import {
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
} from "react-hook-form/dist/types/form"
import { IoChevronBack } from "react-icons/io5"
import { BiReset } from "react-icons/bi"
import { SignUp2InputProps } from "@schema/signup.schema"
import Image from "next/image"
import Form from "@components/Form/Form"

const DEFAULT_IMG =
    "https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000"

interface SignUp2Props {
    imgUrl: string
    errors: Partial<FieldErrorsImpl<SignUp2InputProps>>
    register: UseFormRegister<SignUp2InputProps>
    handleSubmit: UseFormHandleSubmit<SignUp2InputProps>
    reset: UseFormReset<SignUp2InputProps>
    handleBack: () => void
    handleSignUp: (e: SignUp2InputProps) => void
    setImgUrl: (url: string) => void
}

const SignUp2 = ({
    imgUrl,
    setImgUrl,
    errors,
    register,
    handleSubmit,
    handleBack,
    handleSignUp,
    reset,
}: SignUp2Props) => {
    const temp = {} as SignUp2InputProps

    return (
        <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-200 dark:bg-gray-800 rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
            {/* back btn */}
            <button
                onClick={handleBack}
                className="absolute p-2 bg-white dark:bg-gray-900 rounded-full top-6 left-4"
            >
                <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
            </button>

            {/*    Profile Pic  */}
            <div className="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full md:w-32 md:h-32 bg-back border-dPri left-1/2 ">
                <Image
                    src={imgUrl}
                    alt="profile_pic"
                    className="w-full h-full rounded-full"
                    fill
                />
            </div>

            {/*         Form Div  */}
            <div className="flex flex-col mt-20 text-left gap-y-6">
                <Form
                    errors={errors}
                    schemaType={temp}
                    inputs={[
                        {
                            inputName: "name",
                            inputType: "text",
                        },
                    ]}
                    register={register}
                />

                {/* Img and Reset Btn */}
                <div className="flex items-end gap-x-2">
                    <div className="flex flex-col-reverse justify-end w-full">
                        {errors.img && (
                            <p className="p-1 text-base text-red-500 capitalize ">
                                {errors.img.message}
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
                    {/*     Reset Btn */}
                    <button className="p-2 text-3xl rounded-md text-dPri bg-white dark:bg-back">
                        <BiReset
                            className="text-dPri"
                            onClick={() => {
                                reset({ img: DEFAULT_IMG })
                                setImgUrl(DEFAULT_IMG)
                            }}
                        />
                    </button>
                </div>
                {/*     Img URL     */}

                {/*      btn    */}
                <ClickButton onClick={handleSubmit(handleSignUp)} width>
                    <h1>Sign Up</h1>
                </ClickButton>
            </div>
        </div>
    )
}

export default SignUp2
