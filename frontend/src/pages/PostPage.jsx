import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useAuthStore } from "../store/auth.store";

function PostPage() {
    const [currentPage, setCurrentPage] = useState({})
    const { id } = useParams();
    const { getOnePost } = usePostStore();
    const navigate = useNavigate();

    async function getPost() {
        const post = await getOnePost(id);
        setCurrentPage(post);
    }

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    if (!currentPage) return <h1>...loading</h1>

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
                        <img className="avatar" src={currentPage.user?.profilePic} alt={currentPage.user?.fullName} />
                        <span className="username">{currentPage.user?.fullName}</span>
                        <p className="username">{currentPage.user?.email} </p>
                    </div>
                </div>
            </div>

            <Comment post={currentPage} />

        </div>
    );
}

export default PostPage;
