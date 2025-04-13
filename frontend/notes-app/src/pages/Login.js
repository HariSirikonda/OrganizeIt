import React from 'react'
import GoogleIcon from '../assets/google.png';
import LinkedIcon from '../assets/linkedin.png';
import FacebookIcon from '../assets/facebook.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
    return (
        <>
            <Navbar />
            <section className='container-fluid d-flex align-items-center justify-content-center p-5'>
                <form className="border rounded bg-white shadow p-5 m-2 border fade-in" style={{ width: '500px', height: '500px' }}>
                    <h3 className="text-dark fw-bolder fs-4 mt-1">Login to OrganizeIt</h3>
                    <div className="fw-normal text-muted mb-2">
                        New Here? <Link className="text-primary text-decoration-none fw-bold">Create an Account</Link>
                    </div>
                    <div className="form-floating mb-2 ">
                        <input type="email" className="form-control" id="Username" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating ">
                        <input type="password" className="form-control" id="Password" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="mt-2 text-end">
                        <Link className="text-primary" to="/forgot-Password">Forget Password</Link>
                    </div>
                    <button id="ContinueButton" type="submit" className="submit_btn btn btn-md btn-primary w-100 my-2 p-1"><b>Login</b></button>
                    <div className="text-center text-uppercase text-muted mb-1"><b>OR</b></div>
                    <div className='m-1 d-flex align-items-center justify-content-center'>
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

export default Login