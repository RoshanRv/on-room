import { create } from "zustand"

interface ToastProp {
    msg: string
    variant: "error" | "success"
}

interface UseToastProps {
    toast: ToastProp | null
    setToast: (toast: ToastProp) => void
}

const useToast = create<UseToastProps>()((set) => ({
    toast: null,
    setToast: ({ msg, variant }) =>
        set((state) => {
            let toastTimeout: any
            if (state.toast) {
                clearTimeout(toastTimeout)
                toastTimeout = setTimeout(() => {
                    set({ toast: null })
                    return clearTimeout(toastTimeout)
                }, 2000)
                return { toast: { msg, variant } }
            } else {
                toastTimeout = setTimeout(() => {
                    set({ toast: null })
                    return clearTimeout(toastTimeout)
                }, 2000)
                return { toast: { msg, variant } }
            }
        }),
}))

export default useToast
