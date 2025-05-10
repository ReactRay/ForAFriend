import { useEffect } from "react"
import { usePostStore } from "../store/post.store"
import PostCard from "./PostCard"


function PostsList({ posts, canDelete }) {

    return (


        <div className="post-list">
            {posts?.map((post, index) => {

                return (
                    <PostCard post={post} key={post._id} canDelete={canDelete} />
                )
            })}
        </div>
    )
}

export default PostsList
