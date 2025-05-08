import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import axios from "axios";
import { usePostStore } from "../store/post.store";

function Comment({ post, refresh }) {
    const [commentText, setCommentText] = useState("");
    const { user } = useAuthStore()
    const { addComment } = usePostStore()

    async function addCom() {

        await addComment({ body: commentText, user: user._id, post: post._id, })
        refresh()

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addCom()
        setCommentText("");
    };

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
            <CommentList comments={post.comments} />
        </section>
    );
}

export default Comment;


function CommentCard({ comment }) {
    return (
        <div className="comment-card">
            <div className="comment-header">
                <img
                    src={comment.user?.profilePic || "/default-avatar.png"}
                    alt={comment.user?.fullName || "User"}
                    className="comment-avatar"
                />
                <div className="comment-user-info">
                    <p className="comment-author">{comment.user?.fullName || "Anonymous"}</p>
                    <p className="comment-email">{comment.user?.email || ""}</p>
                </div>
            </div>
            <p className="comment-body">{comment.body}</p>
        </div>
    );
}




function CommentList({ comments }) {
    if (!comments?.length) {
        return <p className="no-comments">No comments yet.</p>;
    }

    return (
        <div className="comments-list">
            {comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
            ))}
        </div>
    );
}

