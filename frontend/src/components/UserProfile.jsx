
import { useState } from "react";
import { useAuthStore } from '../store/auth.store';
import { useRef } from "react";

export function UserProfile() {


    const { user, logout, updateProfile, isLoading } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    function handleClick() {
        fileInputRef.current.click()
    }


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        const currentUser = user;

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image, userId: currentUser._id });
        };
    };




    return (
        <div className="user-profile" >
            <div className="img-container">
                <img
                    src={selectedImg || user.profilePic || "/avatar.png"}
                    alt="Profile"
                    onClick={handleClick}
                />
            </div>


            <input
                ref={fileInputRef}
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
            />

            <ul>
                <li>{user.fullName}</li>
                <li>{user.email}</li>
            </ul>

        </div>
    )
}