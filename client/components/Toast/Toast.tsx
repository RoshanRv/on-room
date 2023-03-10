import useToast from "@store/useToast"
import { cva, VariantProps } from "class-variance-authority"
import React, { ReactNode, useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import { shallow } from "zustand/shallow"

// type ToastType = VariantProps<typeof toastClass> & {
//     children: ReactNode
//     show: boolean
//     setShow: (e: boolean) => void
// }

const toastClass = cva(
    [
        "w-10/12 pt-4 bottom-3 sm:w-6/12 md:w-4/12 lg:w-3/12 px-2 md:px-4 py-2 md:py-3 text-base md:text-lg   shadow-md shadow-black/60 absolute left-1/2 -translate-x-1/2 text-center rounded-md text-white transition-all",
    ],
    {
        variants: {
            variant: {
                success: ["bg-green-700/90 "],
                error: ["bg-red-700/90 "],
            },

            showToast: {
                true: ["scale-100"],
                false: ["scale-0"],
            },
        },

        defaultVariants: {
            showToast: false,
        },
    }
)

interface ToastProp {
    msg: string
    variant: "error" | "success"
}

const Toast = () => {
    const {
        toast: { msg, variant },
        showToast,
    } = useToast(
        (state) => ({
            toast: state.toast,
            showToast: state.showToast,
        }),
        shallow
    )

    return (
        <>
            <div className={toastClass({ variant, showToast })}>
                <h1>{msg}</h1>
            </div>
        </>
    )
}

// `w-10/12 pt-4 sm:w-6/12 md:w-4/12 lg:w-3/12 px-2 md:px-4 py-2 md:py-3 text-base md:text-lg   shadow-md shadow-black/60 absolute  left-1/2 -translate-x-1/2 text-center rounded-md text-white transition-all ${
//     toast?.variant === "error"
//         ? "bg-danger"
//         : toast?.variant === "success" && "bg-success"
// } ${toast ? "scale-100" : "scale-0"}  bottom-3 `

// const Toast = ({ status, children, show }: ToastType) => {
//     const [showToast, setShowToast] = useState(show)

//     let hideToast: any

//     useEffect(() => {
//         if (showToast) {
//             hideToast = setTimeout(() => {
//                 setShowToast(false)
//             }, 5000)
//         }

//         return () => clearTimeout(hideToast)
//     }, [showToast])

//     //  to change showToast according to show
//     useEffect(() => {
//         if (show) {
//             setShowToast(true)
//         } else {
//             setShowToast(false)
//         }
//     }, [show])

//     const toast = useToast(state=>state.toast)

//     return (
//         <>
//             <div className={toastClass({ status, showToast })}>
//                 <>
//                     {/* loading */}
//                     <div
//                         className={`h-[.1rem] bg-white abslute -top-10 ${
//                             showToast
//                                 ? "w-full transition-all duration-[5000ms]"
//                                 : "w-0"
//                         }   ease-linear left-0 rounded-md`}
//                     ></div>
//                     <button
//                         onClick={() => setShowToast(false)}
//                         className="absolute text-sm font-bold text-white top-2 right-2"
//                     >
//                         <GrClose />
//                     </button>
//                     {children}
//                 </>
//             </div>
//         </>
//     )
// }

export default Toast
