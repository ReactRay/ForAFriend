import { useNavigate } from 'react-router-dom';
import '../styles/_post-card.scss'
import { usePostStore } from '../store/post.store';

function PostCard({ post, canDelete }) {
    const navigate = useNavigate()
    const { deletePost } = usePostStore()

    async function handleDelete(id) {
        confirm('are you sure ?')
        await deletePost(id)
    }

    return (
        <div className="post-card">
            <img className="post-img" src={post.image} alt={post.title} onClick={() => navigate('/post/' + post._id)} />

            <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <p className="post-price">${post.price}</p>

                <div className="post-user" onClick={() => navigate('/user/' + post.user._id)}>
                    <img className="user-avatar" src={post.user.profilePic} alt={post.user.fullName} />
                    <span className="user-name">{post.user.fullName}</span>
                </div>

                {canDelete && <div className='btn-box'> <button onClick={() => handleDelete(post._id)} className='btn'>delete</button> <button className='btn'>edit</button></div>}
            </div>
        </div>
    );
}

export default PostCard;
