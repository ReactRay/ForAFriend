import { useAuthStore } from "../../store/auth.store"
import { UserProfile } from "./UserProfile"
import PostManagment from "./PostManagment"
function Home() {

    const { user, logout } = useAuthStore()
    return (
        <div className="home-container">

            <section className="profile-container">
                <UserProfile />
                <PostManagment />

            </section>



        </div>
    )
}

export default Home
