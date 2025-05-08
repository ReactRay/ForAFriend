import { useParams } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"
import { useEffect, useState } from "react"
import { usePostStore } from "../store/post.store"
import PostsList from "../components/PostsList"

function UserPage() {
    const [currentUser, setCurrentUser] = useState({})
    const { id } = useParams()
    const { findUser } = useAuthStore()
    const { posts } = usePostStore()

    const userPosts = posts.filter((item) => item.user._id === id)

    async function getUser() {
        const user = await findUser(id)
        setCurrentUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="user-page">
            <div className="user-container">
                <div className="img-box">
                    <img src={currentUser.profilePic} alt={currentUser.fullName} />
                </div>
                <h1>{currentUser.fullName}</h1>
                <p className="email">{currentUser.email}</p>
                <div className="meta">
                    <p><span>Joined:</span> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                    <p><span>Last Update:</span> {new Date(currentUser.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
            <PostsList posts={userPosts} />
        </div>
    )
}

export default UserPage
