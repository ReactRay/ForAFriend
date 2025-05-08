import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import axios from "axios";

function Comment({ post }) {
    const [commentText, setCommentText] = useState("");
    const { user } = useAuthStore()

    async function addComment() {
        console.log({ body: commentText, user: user._id, post: post._id, })
        const comment = await axios.post('http://localhost:5001/comment/add-comment', { body: commentText, user: user._id, post: post._id, })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addComment()
        setCommentText("");
    };

    console.log(post.comments)
    return (
        <section className="comments-section">
            <h2>Comments</h2>
            <form className="comment-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
            <div className="comments-list">
                <p>No comments yet.</p>
            </div>
        </section>
    );
}

export default Comment;
