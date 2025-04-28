import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    return (
        <div>
            <Navbar UserInformation={userInfo} loggedInState={isLoggedIn} />
            This is home page
        </div>
    )
}

export default Home