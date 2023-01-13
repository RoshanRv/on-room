import React, { useState } from "react"
import ClickButton from "../components/Button/ClickButton"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { IoChevronBack } from "react-icons/io5"
import { get, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { object, string, number, TypeOf } from "zod"

type Role = "" | "student" | "teacher"

interface CardRoleProps {
    role: Role
    img: string
    name: "student" | "teacher"
    setRole: (role: Role) => void
}

const signUpSchema = object({
    email: string().email().min(1, "Email is Required"),
    password: string().min(3, "Min 3 Characters"),
    confirmPassword: string().min(3, "Min 3 Characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password Doesn't Match",
    path: ["confirmPassword"],
})

const signUp2Schema = object({
    name: string().min(1, "Name is Required"),
    img: string().url(),
})

type UserInput = TypeOf<typeof signUpSchema>
type UserInput2 = TypeOf<typeof signUp2Schema>

const signUp = () => {
    const [role, setRole] = useState<Role>("")
    const [part, setPart] = useState(1)
    const [parent] = useAutoAnimate<any>()

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<UserInput>({
        resolver: zodResolver(signUpSchema),
    })

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm<UserInput2>({
        resolver: zodResolver(signUp2Schema),
    })

    const handleSignUp = () => {
        setPart((e) => e + 1)
    }

    const handleNext = (e: UserInput) => {
        console.log(e, errors)
        setPart((e) => e + 1)
    }

    const handleNext2 = (e: UserInput2) => {
        console.log({ ...e, ...getValues(), role })
        setPart((e) => e + 1)
    }

    return (
        <main
            ref={parent}
            className="flex flex-col items-center justify-center min-h-screen py-2 bg-back md:px-10 md:py-6 bg gap-y-10 lg:gap-y-16"
        >
            {/*           Part - 0       */}
            {part == 0 && (
                <>
                    {/*    Choice Headign  */}
                    <h1 className="text-3xl font-semibold md:text-5xl text-dPri text-shadow-lg">
                        Choose Between
                    </h1>
                    <div className="flex items-center justify-center text-4xl font-semibold text-dPri gap-x-10">
                        {/*   Student Card   */}
                        <RoleCard
                            img="https://static.vecteezy.com/system/resources/previews/002/153/023/original/student-studying-science-concept-free-vector.jpg"
                            name="student"
                            setRole={setRole}
                            role={role}
                        />

                        <h1>Or</h1>

                        {/*   Teacher Card   */}

                        <RoleCard
                            img="https://media.istockphoto.com/id/1171911961/vector/female-teacher-with-books-and-chalkboard-concept-illustration-for-school-education.jpg?s=612x612&w=0&k=20&c=PF5bNlFhW9b9I-5aXwp03yYkuWjk9x_FuPK0YsRcesA="
                            name="teacher"
                            setRole={setRole}
                            role={role}
                        />
                    </div>
                    {/*     Btn     */}
                    <ClickButton
                        onClick={handleSignUp}
                        disabled={
                            role == "student" || role == "teacher"
                                ? false
                                : true
                        }
                        variant={"primary"}
                    >
                        <h1>
                            {role == "student"
                                ? "Sign Up As Student"
                                : role == "teacher"
                                ? "Sign Up As Teacher"
                                : "Sign Up"}
                        </h1>
                    </ClickButton>
                </>
            )}
            {/*         End Part - 0         */}

            {/*      Task Bar and Back Button    */}

            {part > 0 && <div className=""></div>}

            {/*      End Task Bar and Back Button    */}

            {/*      Part - 1    */}
            {part == 1 && (
                <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-800 rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
                    {/* back btn */}
                    <button
                        onClick={() => setPart((e) => e - 1)}
                        className="absolute p-2 bg-gray-900 rounded-full top-6 left-4"
                    >
                        <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
                    </button>

                    <h1 className="font-semibold capitalize lg:text-3xl md:text-2xl text-dPri">
                        Sign Up As {role || "Teacher"}
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
                            <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-code text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
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
                            <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-code text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
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
                            <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-code text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                                Confirm Password
                            </h1>
                        </div>

                        {/*      btn    */}
                        <ClickButton onClick={handleSubmit(handleNext)} width>
                            <h1>Next</h1>
                        </ClickButton>
                    </div>
                </div>
            )}
            {/*      End Part - 1    */}

            {/*      Part - 2    */}
            {part == 2 && (
                <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-gray-800 rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
                    {/* back btn */}
                    <button
                        onClick={() => setPart((e) => e - 1)}
                        className="absolute p-2 bg-gray-900 rounded-full top-6 left-4"
                    >
                        <IoChevronBack className="text-2xl font-bold rounded-full text-dPri" />
                    </button>

                    <h1 className="font-semibold capitalize lg:text-3xl md:text-2xl text-dPri">
                        Sign Up As {role || "Teacher"}
                    </h1>

                    {/*         Form Div  */}
                    <div className="flex flex-col mt-1 text-left gap-y-10 ">
                        {/*     Name     */}
                        <div className="flex flex-col-reverse justify-end w-full">
                            {errors2.name && (
                                <p className="p-1 text-base text-red-500 capitalize ">
                                    {errors2.name.message}
                                </p>
                            )}
                            <input
                                type="text"
                                placeholder="name"
                                className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                                {...register2("name")}
                            />
                            <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-code text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                                Name
                            </h1>
                        </div>

                        {/*     Img URL     */}
                        <div className="flex flex-col-reverse justify-end w-full">
                            {errors2.img && (
                                <p className="p-1 text-base text-red-500 capitalize ">
                                    {errors2.img.message}
                                </p>
                            )}
                            <input
                                type="password"
                                placeholder="password"
                                className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-dPri/70 border-dPri/70 placeholder-shown:bg-transparent focus:bg-dPri/70 font-sm "
                                {...register2("img")}
                            />
                            <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-dPri/80 peer-focus:text-code text-dPri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                                Image
                            </h1>
                        </div>

                        {/*      btn    */}
                        <ClickButton onClick={handleSubmit2(handleNext2)} width>
                            <h1>Sign Up</h1>
                        </ClickButton>
                    </div>
                </div>
            )}
            {/*      End Part - 2    */}
        </main>
    )
}

export default signUp

const RoleCard = ({ role, img, name, setRole }: CardRoleProps) => {
    return (
        <div
            onClick={() => setRole(name)}
            className={`flex flex-col p-4 text-center bg-gray-800 rounded-md  cursor-pointer  w-max gap-y-6 transition-all border-4 shadow-black shadow-xl
             ${role == name ? "border-dPri scale-105 " : " border-gray-800"}`}
        >
            {/*   Img   */}
            <div className="w-[20vw] overflow-hidden rounded-md">
                <img
                    src={img}
                    alt={name + "_img"}
                    className="w-full h-full transition-all rounded-md hover:scale-110"
                />
            </div>
            {/*   Role   */}
            <h1 className="capitalize">{name}</h1>
        </div>
    )
}
