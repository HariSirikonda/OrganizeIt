import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


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

    const handleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const payLoad = { email: decoded.email, password: decoded.sub };
        console.log("User Info:", decoded);
        try {
            const response = await axiosInstance.post("/login", payLoad);
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

    const handleLoginError = () => {
        console.log("Login Failed");
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
                    <input
                        type="email"
                        className="form-control shadow-none"
                        id="Username"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="name@example.com" required
                    />
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
                        <input
                            type="checkbox"
                            className="form-check-input shadow-none border-dark"
                            id="exampleCheck1"
                            onChange={(e) => setHide(!hide)}
                        />
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
                    {/* Google Login Button */}
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                </div>
            </form>
        </>
    );
}

export default Login;
