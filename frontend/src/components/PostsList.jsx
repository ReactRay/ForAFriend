import { useEffect } from "react"
import { usePostStore } from "../store/post.store"
import PostCard from "./PostCard"


function PostsList({ posts }) {

    return (


        <div className="post-list">
            {posts?.map((post, index) => {

                return (
                    <PostCard post={post} key={post._id} />
                )
            })}
        </div>
    )
}

export default PostsList
