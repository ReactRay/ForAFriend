import { useAuthStore } from "../../store/auth.store"
import { UserProfile } from "./UserProfile"
import PostsList from "./PostsList"
import PostManagment from "./PostManagment"
import { usePostStore } from "../../store/post.store"
import { useEffect } from "react"
function Home() {

    const { user, logout } = useAuthStore()
    const { getPosts } = usePostStore()


    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className="home-container">

            <section className="profile-container">
                <UserProfile />
                <PostManagment />
                <PostsList />
            </section>



        </div>
    )
}

export default Home
