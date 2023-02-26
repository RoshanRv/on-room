import { QueryObserver, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"

const useUser = () => {
    const queryClient = useQueryClient()
    const [user, setUser] = useState<UserProps>()
    const [userRole, setUserRole] = useState<UserProps["role"]>()

    useEffect(() => {
        // Create an observer to watch the query and update its result into state
        const observer = new QueryObserver(queryClient, {
            queryKey: ["users"],
            // enabled: false,
            retry: 1,
        })

        const unsubscribe = observer.subscribe((queryResult: any) => {
            // console.log(queryResult.data.data.role)

            setUser(queryResult.data.data)
            setUserRole(queryResult.data.data.role)
        })

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe()
        }
    }, [queryClient])

    return { user, userRole }
}

export default useUser
