import { useAuthStore } from "../store/auth.store"
import { UserProfile } from "../components/UserProfile"
import PostsList from "../components/PostsList"
import PostManagment from "../components/PostManagment"
import { usePostStore } from '../store/post.store'
import { useEffect } from "react"
function Home() {

    const { user, logout } = useAuthStore()
    const { getPosts, posts } = usePostStore()


    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (
        <div className="home-container">

            <section className="profile-container">
                <UserProfile />
                <PostManagment />
                <PostsList posts={posts} />
            </section>



        </div>
    )
}

export default Home
