import { useState, useRef } from "react";
import { usePostStore } from "../store/post.store"
import { useAuthStore } from '../store/auth.store';
import { Navigate, useNavigate } from "react-router-dom";

function PostManagment() {

    const { user } = useAuthStore()
    const { createPost, changeFilter } = usePostStore()
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        contact: "",
    });

    const [openModal, setOpenModal] = useState(false)

    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));


    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const postToUpload = { ...formData, user: user._id }

        createPost(postToUpload)

        setFormData({
            title: "",
            description: "",
            price: "",
            image: "",
            contact: "",
        })
        setOpenModal(false)
    };

    return (
        <section className="post-manager">
            <ul>
                <li onClick={() => setOpenModal(true)}>Create a post</li>
                <li onClick={() => navigate('/requests')}>My Requests</li>
                <li onClick={() => navigate('/jobs')}>My Jobs</li>
                <li><input type="text" placeholder="search for jobs" className="search-bar" onChange={(e) => changeFilter(e.target.value)} /></li>
            </ul>

            {openModal && <section className="modal">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleChange}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />

                    <button type="submit">Submit Post</button>

                    <button onClick={() => setOpenModal(false)} style={{ backgroundColor: 'coral' }} >Close</button>
                </form>
            </section>}
        </section>
    );
}

export default PostManagment;
