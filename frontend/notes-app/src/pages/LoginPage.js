import React from 'react';
import Navbar from '../components/Navbar';
import Login from './Login';
import { Link } from 'react-router-dom';


function LoginPage() {
    return (
        <>
            <section>
                <div className='container-fluid d-flex align-items-center justify-content-center p-5'>
                    <Login />
                </div>
            </section>
        </>
    );
}

export default LoginPage;