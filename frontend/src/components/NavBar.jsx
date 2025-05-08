import { useNavigate } from "react-router-dom"

function NavBar() {

    const navigate = useNavigate()
    return (
        <nav>
            <h2>Crafty</h2>
            <ul>
                <li onClick={() => navigate('/home')}>Home</li>
                <li>About</li>
                <li>Start</li>
            </ul>
        </nav>
    )
}

export default NavBar


