import job1 from '../assets/job1.jpg'
import job2 from '../assets/job2.jpg'
import job3 from '../assets/job3.jpg'

function Login() {
    return (
        <div className='login-signup'>
            <h1>login</h1>
            <form >
                <div className='form-group'>
                    <input type="text" placeholder='email' />
                </div>
                <div className='form-group'>
                    <input type="password" placeholder='password' />

                </div>
                <div className='form-group'>
                    <button>submit</button>
                    <p>no account? <span>sign up here</span></p>
                </div>
                <section className='image-container'>
                    <img src={job1} alt="alt" />
                    <img src={job2} alt="alt" />
                    <img src={job3} alt="alt" />
                </section>
            </form>



        </div>
    )
}

export default Login
