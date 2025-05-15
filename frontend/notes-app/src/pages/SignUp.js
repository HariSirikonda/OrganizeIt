import React from 'react'
import GoogleIcon from '../assets/google.png';
import LinkedIcon from '../assets/linkedin.png';
import FacebookIcon from '../assets/facebook.png';
import Navbar from '../components/Navbar';

function SignUp() {
    return (
        <>
            <Navbar />
            <section className='container-fluid d-flex align-items-center justify-content-center p-3'>
                <form className="rounded bg-white shadow p-4 m-2" style={{ width: '500px' }}>
                    <h3 className="text-dark fw-bolder fs-4 mt-1">OrganizeIt welcomes you</h3>
                    <div className="fw-normal text-muted mb-2">
                        Start Creating an Account
                    </div>
                    <div className="form-floating mb-2 ">
                        <input type="email" className="form-control shadow-none" id="Username" placeholder="name@example.com" />
                        <label for="floatingInput">Full Name</label>
                    </div>
                    <div className="form-floating mb-2 ">
                        <input type="email" className="form-control shadow-none" id="Username" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control shadow-none" id="Password" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control shadow-none" id="Password" placeholder="Password" />
                        <label for="floatingPassword">Confirm Password</label>
                    </div>
                    <button id="ContinueButton" type="submit" className="nav-color text-white submit_btn btn btn-md w-100 my-2 p-1"><b>Sign Up</b></button>
                    <div className="text-center text-uppercase text-muted mb-1"><b>OR</b></div>
                    <div className='m-2 d-flex align-items-center justify-content-center'>
                        <div className='bg-light m-2 d-flex align-items-center justify-content-center'>
                            <img className='m-1 p-0' alt='show me' src={GoogleIcon} style={{ width: "30px", height: "30px" }}></img>
                        </div>
                        <div className='bg-light m-2 d-flex align-items-center justify-content-center'>
                            <img className='m-1 p-0' alt='show me' src={FacebookIcon} style={{ width: "30px", height: "30px" }}></img>
                        </div>
                        <div className='bg-light m-2 d-flex align-items-center justify-content-center'>
                            <img className='m-1 p-0' alt='show me' src={LinkedIcon} style={{ width: "30px", height: "30px" }}></img>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default SignUp
