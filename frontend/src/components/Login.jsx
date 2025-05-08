import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import job1 from '../assets/job1.jpg';
import job2 from '../assets/job2.jpg';
import job3 from '../assets/job3.jpg';
import axios from 'axios'
import { useAuthStore } from '../store/auth.store';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const { login } = useAuthStore()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault()
        login(formData)

    }

    return (
        <div className='login-signup'>
            <h1>login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <button type="submit">submit</button>
                    <p>
                        no account?{" "}
                        <span onClick={() => navigate('/signup')}>sign up here</span>
                    </p>
                </div>
                <section className='image-container'>
                    <img src={job1} alt="alt" />
                    <img src={job2} alt="alt" />
                    <img src={job3} alt="alt" />
                </section>
            </form>
        </div>
    );
}

export default Login;
