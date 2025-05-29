import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from '../assets/search.png';
import Remove from '../assets/remove.png';
import User from '../assets/user.png';
import axiosInstance from '../utils/axiosInstance';

function Navbar({ showSearch, showProfile }) {
    const [search, setSearch] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const [profileClick, setProfileClick] = useState(false);
    const navigate = useNavigate()

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            }
        }
    };

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            alert("Please login to see your profile.");
            return;
        }
        setProfileClick(!profileClick);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    const handleEditProfile = (e) => {
        e.preventDefault();
        navigate('/profile')
    }

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>
            <nav class="navbar nav-color navbar-expand-lg">
                <div class="container-fluid">
                    <Link class="navbar-brand text-white" to='/'><b>OrganizeIt</b></Link>
                    <div class="collapse navbar-collapse">
                        <div className='d-flex w-25'>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link text-white active" to='/'>Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-white active" to='/notes'>My Notes</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-white active" to='/analytics'>Analytics</Link>
                                </li>
                            </ul>
                        </div>
                        {showSearch &&
                            <div className='d-flex bg-white rounded w-50 shadow-sm'>
                                <input className='form-control border-0 shadow-none rounded py-1' placeholder='Search notes' type='text' style={{ fontSize: '0.9rem' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                                {search &&
                                    <button className='btn shadow-none bg-white border-0 rounded-circle' onClick={(e) => setSearch('')}>
                                        <img className='m-1' src={Remove} alt='show me' style={{ width: '15px', height: '15px' }}></img>
                                    </button>
                                }
                                <img className='m-1 p-1' src={Search} alt='show me' style={{ width: '28px', height: '28px' }}></img>
                            </div>
                        }
                        <div className='d-flex w-25 justify-content-end'>
                            {!isLoggedIn &&
                                <div className='d-flex w-25 justify-content-end'>
                                    <div className='m-1'>
                                        <button className="btn btn-sm bg-white" onClick={handleLogin}><b>Login</b></button>
                                    </div>
                                    <div className='m-1'>
                                        <button className="btn btn-sm bg-white" onClick={handleSignUp}><b>Register</b></button>
                                    </div>
                                </div>
                            }
                            {showProfile &&
                                <button className='bg-white border-0 rounded-circle m-1' style={{ width: '32px', height: '32px' }} onClick={handleProfileClick}>
                                    <img className='img-fluid' src={User} alt='show me'></img>
                                </button>
                            }
                        </div>
                    </div>
                    {profileClick && isLoggedIn && (
                        <div className='profile-dropdown border'>
                            <p className='text-dark fw-bold text-center'>{userInfo?.fullName}</p>
                            <button className='btn form-control text-start shadow-none' onClick={handleEditProfile}>Edit Profile</button>
                            <button className='btn form-control text-start shadow-none'>Settings & Profile</button>
                            <button className='btn form-control text-start shadow-none'>Help & Support</button>
                            <button className='btn form-control text-start shadow-none'>Display & Accessibility</button>
                            <button className='btn form-control text-start shadow-none text-danger' onClick={onLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar