import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../assets/search.png';
import Remove from '../assets/remove.png';
import User from '../assets/user.jpg';
import axiosInstance from '../utils/axiosInstance';

function Navbar() {
    const [showSearch, setShowSearch] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [profileClick, setProfileClick] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setProfileClick(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
                setIsLoggedIn(!!localStorage.getItem('token'));
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            alert("Please login to see your profile.");
            return;
        }
        setProfileClick(!profileClick);
    };

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

    const onLogout = (e) => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserInfo(null);
        navigate(0);
    }

    return (
        <div>
            <nav className="navbar nav-color navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to='/'><b>OrganizeIt</b></Link>
                    <div className="collapse navbar-collapse">
                        <div className='d-flex w-25'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-white active" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white active" to='/notes'>My Notes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white active" to='/analytics'>Analytics</Link>
                                </li>
                            </ul>
                        </div>
                        {showSearch &&
                            <div className='d-flex bg-white rounded w-50 shadow-sm'>
                                <input
                                    className='form-control border-0 shadow-none rounded py-1'
                                    placeholder='Search notes'
                                    type='text'
                                    style={{ fontSize: '0.9rem' }}
                                    value={searchText}
                                    onChange={(e) => { setSearchText(e.target.value) }}
                                />
                                {searchText &&
                                    <button
                                        className='btn shadow-none bg-white border-0 rounded-circle'
                                        onClick={(e) => setSearchText('')}
                                    >
                                        <img
                                            className='m-1'
                                            src={Remove}
                                            alt='show me'
                                            style={{ width: '15px', height: '15px' }}
                                        ></img>
                                    </button>
                                }
                                <img
                                    className='m-1 p-1'
                                    src={Search}
                                    alt='show me'
                                    style={{ width: '28px', height: '28px' }}
                                ></img>
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
                            <div
                                className='d-flex align-items-center justify-content-center mx-1'
                                onClick={handleProfileClick}
                            >
                                <img
                                    className='img-fluid rounded-circle'
                                    src={User}
                                    alt='show me'
                                    style={{ width: '32px', height: '32px' }}
                                />
                            </div>
                        </div>
                    </div>
                    {profileClick && isLoggedIn && (
                        <div className='profile-dropdown shadow-sm border' ref={menuRef}>
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