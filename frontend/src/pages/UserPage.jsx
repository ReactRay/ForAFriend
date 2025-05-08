import { useParams } from "react-router-dom"
import { useAuthStore } from "../../store/auth.store"


function UserPage() {

    const { id } = useParams()
    console.log(id)

    return (
        <div className="user-page">

            {id}

        </div>
    )
}

export default UserPage
