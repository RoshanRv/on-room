import { create } from "zustand"

interface ToastProp {
    msg: string
    variant: "error" | "success"
}

interface UseToastProps {
    toast: ToastProp
    setToast: (toast: ToastProp) => void
    showToast: boolean
}

const useToast = create<UseToastProps>()((set) => ({
    toast: {
        msg: "",
        variant: "success",
    },
    showToast: false,
    setToast: ({ msg, variant }) =>
        set((state) => {
            let toastTimeout: any
            if (state.showToast) {
                clearTimeout(toastTimeout)
                toastTimeout = setTimeout(() => {
                    set({ showToast: false })
                    return clearTimeout(toastTimeout)
                }, 2000)
                return { toast: { msg, variant }, showToast: true }
            } else {
                toastTimeout = setTimeout(() => {
                    set({ showToast: false })
                    return clearTimeout(toastTimeout)
                }, 2000)
                return { toast: { msg, variant }, showToast: true }
            }
        }),
}))

export default useToast
