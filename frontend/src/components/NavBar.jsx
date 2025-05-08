import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/auth.store"

function NavBar() {
    const { user } = useAuthStore()
    const navigate = useNavigate()
    return (
        <nav>
            <h2>Crafty</h2>
            <ul>
                {user && <li onClick={() => navigate('/home')}>Home</li>}

            </ul>
        </nav>
    )
}

export default NavBar


