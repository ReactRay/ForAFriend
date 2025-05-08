import '../styles/_post-card.scss'

function PostCard({ post }) {
    return (
        <div className="post-card">
            <img className="post-img" src={post.image} alt={post.title} />

            <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <p className="post-price">${post.price}</p>

                <div className="post-user">
                    <img className="user-avatar" src={post.user.profilePic} alt={post.user.fullName} />
                    <span className="user-name">{post.user.fullName}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
