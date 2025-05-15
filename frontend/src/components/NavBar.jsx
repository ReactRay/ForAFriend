import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/auth.store"

function NavBar() {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()
    return (
        <nav>
            <h2>Crafty</h2>
            <ul>
                {user && <><li onClick={() => navigate('/home')}>Home</li>
                    <li onClick={() => navigate('/user/' + user._id)}>Profile</li>
                    <li onClick={logout} >Logout</li></>}


            </ul>
        </nav>
    )
}

export default NavBar


