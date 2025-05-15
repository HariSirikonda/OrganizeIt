import React from 'react';
import Navbar from '../components/Navbar';
import Login from './Login';


function LoginPage() {
    return (
        <>
            <Navbar showLR={false} showSearch={false} />
            <section className='container-fluid d-flex align-items-center justify-content-center p-5'>
                <Login />
            </section>
        </>
    );
}

export default LoginPage;