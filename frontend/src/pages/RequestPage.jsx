import { useEffect } from "react"
import { useRequestStore } from "../store/request.store"
import { useAuthStore } from "../store/auth.store"



function RequestPage() {

    const { getRequests } = useRequestStore()
    const { user } = useAuthStore()
    useEffect(() => {
        getRequests(user._id)
    }, [])
    return (
        <div>
            requests are here !
        </div>
    )
}

export default RequestPage
