import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import HomeImg from '../assets/notesLady.png';
import ImgCard1 from '../assets/allinone.avif';
import ImgCard2 from '../assets/workflow.avif';
import ImgCard3 from '../assets/usersupport.avif';
import ImgCard4 from '../assets/smarttools.avif';
import Login from './Login';

function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const [isGetStarted, setIsGetStarted] = useState(null);
    const navigate = useNavigate();
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
                setIsLoggedIn(true);
            }
        }
    };
    useEffect(() => {
        getUserInfo()
        return () => { };
    },)
    const handleGetStarted = () => {
        navigate('/signup');
    };
    // useEffect(() => {
    //     getUserInfo()
    //     return () => { };
    // }, [userInfo])

    return (
        <div>
            <Navbar UserInformation={userInfo} showSearch={true} showLR={!isLoggedIn} showProfile={true} />
            <section className='m-0 border'>
                <div className='d-flex container pt-5 align-items-center justify-content-start'>
                    <div className='p-2 w-50 me-2'>
                        <div className='p-3'>
                            <h1>Communicate.</h1>
                            <h1>Collaborate. Create...</h1>
                        </div>
                        <div className='p-3'>
                            <h6>OrganizeIt Provides you an effective and powerful way to manage your tasks.</h6>
                        </div>
                        <div className='p-3'>
                            {!isLoggedIn &&
                                <button className='btn nav-color text-white shadow-none text-decoration-none' onClick={handleGetStarted}>Get started</button>
                            }
                        </div>
                    </div>
                    <div className='p-1 w-50 d-flex align-items-center justify-content-center'>
                        <div style={{ width: "500px", height: "500px" }}>
                            <img className='img' src={HomeImg} alt='show me' style={{ width: "500px", height: "500px" }}></img>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container-fluid bg-light border'>
                <div className='border d-flex align-items-center justify-content-center p-5'>
                    <div className='mx-4'>
                        <img className='thick-border img img-fluid rounded' src={ImgCard1} alt='show me' style={{ width: "226px", height: "298px" }}></img>
                    </div>
                    <div className='mx-4'>
                        <img className='thick-border img img-fluid rounded' src={ImgCard2} alt='show me' style={{ width: "226px", height: "298px" }}></img>
                    </div>
                    <div className='mx-4'>
                        <img className='thick-border img img-fluid rounded' src={ImgCard3} alt='show me' style={{ width: "226px", height: "298px" }}></img>
                    </div>
                    <div className='mx-4'>
                        <div className='thick-border img img-fluid rounded'>
                            <img src={ImgCard4} alt='show me' style={{ width: "226px", height: "298px" }}></img>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home