
import { useState } from "react";
import { usePostStore } from "../store/post.store";

function EditModal({ post, setOpenModal }) {

    const { updatePost, getPosts } = usePostStore()

    const [formData, setFormData] = useState({
        id: post._id,
        title: post.title,
        description: post.description,
        price: post.price,
        contact: post.contact,
        image: post.image,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));


    };

    async function handleSubmit(e) {
        e.preventDefault()
        await updatePost(formData)
        setOpenModal(false)
        getPosts()
    }



    return (
        <div className="edit-modal">
            <form onSubmit={handleSubmit} >
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



                <button type="submit">Submit Post</button>

                <button onClick={() => setOpenModal(false)} style={{ backgroundColor: 'coral' }} >Close</button>
            </form>



        </div>
    )
}

export default EditModal
