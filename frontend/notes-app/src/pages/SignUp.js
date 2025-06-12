import { useEffect, useState } from 'react'
import GoogleIcon from '../assets/google.png';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [hide, setHide] = useState(true);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords mismatched.");
            return;
        }

        try {
            const response = await axiosInstance.post("/create-account", {
                fullName,
                email,
                password,
                confirmPassword,
            });
            if (response.data && !response.data.error && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/login");
            } else {
                setError(response.data.message || "Signup failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    const handleSignUpSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        const payLoad = {
            fullName: decoded.name,
            email: decoded.email,
            password: decoded.sub,
            confirmPassword: decoded.sub,
            isGoogleAuth: true,
        }
        try {
            const response = await axiosInstance.post("/create-account", payLoad);
            console.log("user created", response);
            if (response.data.message === "User already exists") {
                alert("User already Exits.");
            }
            else if (response.data.message === "Registration Successful") {
                navigate("/login");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleSignUpError = () => {
        console.log("Login Failed");
    };

    useEffect(() => {
        if (error) {
            alert(error);
            setError("");
        }
    }, [error]);

    return (
        <>
            <section className='container-fluid d-flex align-items-center justify-content-center p-3'>
                <form className="rounded bg-white shadow p-4 m-2" style={{ width: '500px' }}>
                    <h3 className="text-dark fw-bolder fs-4 mt-1">OrganizeIt welcomes you</h3>
                    <div className="fw-normal text-muted mb-2">
                        Start Creating an Account
                    </div>
                    <div className="form-floating mb-2 ">
                        <input
                            type="text"
                            className="form-control shadow-none"
                            onChange={(e) => { setFullName(e.target.value) }}
                            id="Username"
                            value={fullName}
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Full Name</label>
                    </div>
                    <div className="form-floating mb-2 ">
                        <input
                            type="email"
                            className="form-control shadow-none"
                            onChange={(e) => { setEmail(e.target.value) }}
                            id="email"
                            value={email}
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type={hide ? "password" : "text"}
                            className="form-control shadow-none"
                            onChange={(e) => { setPassword(e.target.value) }}
                            id="Password"
                            placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type={hide ? "password" : "text"}
                            className="form-control shadow-none"
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            id="confirmPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <div className="form-check m-2">
                        <input
                            type="checkbox"
                            className="form-check-input shadow-none border-dark"
                            id="exampleCheck1"
                            onClick={(e) => { setHide(!hide) }}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                    </div>
                    <button
                        id="ContinueButton"
                        type="submit"
                        onClick={handleSignup}
                        className="nav-color text-white shadow-none submit_btn btn btn-md w-100 my-2 p-1"
                    >
                        <b>Sign Up</b>
                    </button>
                    <div className="text-center text-uppercase text-muted">
                        <b>OR</b>
                    </div>
                    <div className='m-1 d-flex align-items-center justify-content-center'>
                        {/* Google Login Button */}
                        <GoogleLogin
                            onSuccess={handleSignUpSuccess}
                            onError={handleSignUpError}
                        />
                    </div>
                </form>
            </section>
        </>
    )
}

export default SignUp
