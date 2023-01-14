import React from "react"
import ClickButton from "@components/Button/ClickButton"
import RoleCard from "@components/SelectRole/RoleCard"
import TEACHER_IMG from "@public/teacher_role.jpeg"
import STUDENT_IMG from "@public/student_role.webp"

const SelectRole = ({ role, setRole, handleNext, page }: SelectRoleProps) => {
    return (
        <>
            {/*    Choice Headign  */}
            <h1 className="text-3xl font-semibold md:text-5xl text-dPri text-shadow-sm">
                Choose Between
            </h1>
            <div className="flex items-center justify-center text-4xl font-semibold text-dPri gap-x-4 md:gap-x-10">
                {/*   Student Card   */}
                <RoleCard
                    img={STUDENT_IMG}
                    name="student"
                    setRole={setRole}
                    role={role}
                />

                <h1 className="text-xl md:text-3xl lg:text-4xl">Or</h1>

                {/*   Teacher Card   */}

                <RoleCard
                    img={TEACHER_IMG}
                    name="teacher"
                    setRole={setRole}
                    role={role}
                />
            </div>
            {/*     Btn     */}
            <ClickButton
                onClick={handleNext}
                disabled={role == "student" || role == "teacher" ? false : true}
                variant={"primary"}
            >
                <h1>
                    {role == "student"
                        ? `${
                              page == "signin" ? "Sign In" : "Sign Up"
                          } As Student`
                        : role == "teacher"
                        ? `${
                              page == "signin" ? "Sign In" : "Sign Up"
                          } As Teacher`
                        : `${page == "signin" ? "Sign In" : "Sign Up"}`}
                </h1>
            </ClickButton>
        </>
    )
}

export default SelectRole
