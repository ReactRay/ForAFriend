import { useState } from "react";

function PostManagment() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        contact: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Post:", formData);
        // Later: send to backend or Firestore
    };

    return (
        <section className="post-manager">
            <ul>
                <li>create a post</li>
                <li>my requests</li>
            </ul>

            <section>
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
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
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
                </form>
            </section>
        </section>
    );
}

export default PostManagment;
