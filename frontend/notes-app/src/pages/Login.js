import React, { useEffect, useState } from 'react';
import GoogleIcon from '../assets/google.png';
import LinkedIcon from '../assets/linkedin.png';
import FacebookIcon from '../assets/facebook.png';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [hide, setHide] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page reload
        if (!email) {
            setError("Please enter an Email Address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        try {
            const response = await axiosInstance.post("/login", { email: email, password: password });
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/home");
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An Unexpected error occured, try again.!");
            }
        }
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <>
            <form
                onSubmit={handleLogin}
                className="border rounded bg-white shadow p-5 border fade-in"
                style={{ width: '500px', height: '500px' }}
            >
                <h3 className="text-dark fw-bolder fs-4 mt-1">Login to OrganizeIt</h3>
                <div className="fw-normal text-muted mb-2">
                    New Here? <Link className="text-primary text-decoration-none fw-bold" to='/signup'>Create an Account</Link>
                </div>
                {/* {error && <p className="text-danger">{error}</p>} */}
                <div className="form-floating mb-2 ">
                    <input type="email" className="form-control shadow-none" id="Username" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                    <label htmlFor="Username">Email address</label>
                </div>
                <div className="form-floating ">
                    <input
                        type={hide ? "password" : "text"}
                        className="form-control shadow-none"
                        id="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    >
                    </input>
                    <div className="mb-3 form-check m-1">
                        <input type="checkbox" className="form-check-input shadow-none border-dark" id="exampleCheck1" onChange={(e) => setHide(!hide)} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                    </div>
                    <label htmlFor="Password">Password</label>
                </div>
                <div className="mt-2 text-end">
                    <Link className="text-primary" to="/forgot-Password">Forget Password</Link>
                </div>
                <button id="ContinueButton" type="submit" className="submit_btn btn btn-md nav-color text-white shadow-none w-100 my-2 p-1"><b>Login</b></button>
                <div className="text-center text-uppercase text-muted mb-1"><b>OR</b></div>
                <div className='m-1 d-flex align-items-center justify-content-center'>
                    <button className='btn bg-light m-2 d-flex align-items-center justify-content-center shadow-sm'>
                        <img
                            className='m-1 p-0'
                            alt='show me'
                            src={GoogleIcon}
                            style={{ width: "30px", height: "30px" }}
                        ></img>
                        <span className='text-dark mx-2'>Sign Up with Google</span>
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login;
