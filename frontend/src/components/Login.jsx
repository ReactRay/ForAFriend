import job1 from '../assets/job1.jpg'

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
                </div>
                <section className='image-container'>
                    <img src={job1} alt="alt" />
                    <img src={job1} alt="alt" />
                    <img src={job1} alt="alt" />
                </section>
            </form>



        </div>
    )
}

export default Login
