import { create } from "zustand"

interface UseLoading {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const useLoading = create<UseLoading>()((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
}))

export default useLoading
