import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useAuthStore } from "../store/auth.store";
import { useRequestStore } from "../store/request.store";

function PostPage() {
    const [currentPage, setCurrentPage] = useState(null);
    const [alreadyRequested, setAlreadyRequested] = useState(false);

    const { user } = useAuthStore();
    const { id } = useParams();
    const { getOnePost } = usePostStore();
    const { createRequest, requests, getRequests } = useRequestStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?._id) {
            getPost();
            getRequests(user._id, "sender"); // fetch only this user's sent requests
        }
    }, [user]);

    async function getPost() {
        const post = await getOnePost(id);
        setCurrentPage(post);
    }

    useEffect(() => {
        if (user && currentPage && requests.length > 0) {
            const found = requests.some(
                (req) => req?.sender?._id === user._id && req?.post?._id === id
            );
            setAlreadyRequested(found);
        }
    }, [requests, user, currentPage, id]);

    async function makeArequest() {
        const data = {
            postId: currentPage._id,
            senderId: user._id,
            receiverId: currentPage.user._id,
        };

        await createRequest(data);
        await getRequests(user._id, "sender"); // refresh requests to reflect new one
    }

    console.log(requests, user, currentPage)

    if (!currentPage) return <h1>...loading</h1>;

    return (
        <div className="post-page">
            <button className="back-btn" onClick={() => navigate("/home")}>
                ← Back to Home
            </button>

            {!alreadyRequested ? (
                <button
                    onClick={makeArequest}
                    className="back-btn"
                    style={{ float: "right" }}
                >
                    Make a request
                </button>
            ) : (
                <p style={{ float: "right" }}>You already made a request</p>
            )}

            <div className="post-content">
                <img
                    className="post-img"
                    src={currentPage.image}
                    alt={currentPage.title}
                />

                <div className="post-info">
                    <h1>{currentPage.title}</h1>
                    <p className="description">{currentPage.description}</p>
                    <p className="price">{currentPage.price} ₪</p>
                    <p className="contact">Contact: {currentPage.contact}</p>

                    <div className="user-info">
                        <img
                            style={{ cursor: "pointer" }}
                            className="avatar"
                            onClick={() => navigate("/user/" + currentPage.user._id)}
                            src={currentPage.user?.profilePic}
                            alt={currentPage.user?.fullName}
                        />
                        <span className="username">{currentPage.user?.fullName}</span>
                        <p className="username">{currentPage.user?.email}</p>
                    </div>
                </div>
            </div>

            <Comment post={currentPage} refresh={getPost} />
        </div>
    );
}

export default PostPage;
