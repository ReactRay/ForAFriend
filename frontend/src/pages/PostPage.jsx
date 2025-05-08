import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../store/post.store";

function PostPage() {
    const { id } = useParams();
    const { posts } = usePostStore();
    const navigate = useNavigate();

    const currentPage = posts.find((item) => item._id === id);

    if (!currentPage) return <p>Post not found</p>;

    return (
        <div className="post-page">
            <button className="back-btn" onClick={() => navigate("/home")}>
                ← Back to Home
            </button>

            <div className="post-content">
                <img className="post-img" src={currentPage.image} alt={currentPage.title} />

                <div className="post-info">
                    <h1>{currentPage.title}</h1>
                    <p className="description">{currentPage.description}</p>
                    <p className="price">{currentPage.price} ₪</p>
                    <p className="contact">Contact: {currentPage.contact}</p>

                    <div className="user-info">
                        <img className="avatar" src={currentPage.user.profilePic} alt={currentPage.user.fullName} />
                        <span className="username">{currentPage.user.fullName}</span>
                        <p className="username">{currentPage.user.email} </p>
                    </div>
                </div>
            </div>

            <section className="comments-section">
                <h2>Comments</h2>
                <form className="comment-form">
                    <input type="text" placeholder="Write a comment..." />
                    <button type="submit">Post</button>
                </form>
                <div className="comments-list">
                    {/* Map comments here later */}
                    <p>No comments yet.</p>
                </div>
            </section>
        </div>
    );
}

export default PostPage;
