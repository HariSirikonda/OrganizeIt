import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ImgCard1 from '../assets/allinone.avif';
import ImgCard2 from '../assets/workflow.avif';
import ImgCard3 from '../assets/usersupport.avif';
import ImgCard4 from '../assets/smarttools.avif';

function Home() {
    const [isLoggedIn] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const exploreWorkSpace = [
        {
            title: "Workflows That Work",
            description: "Easily manage notes with simple status updates and smooth transitions between tasks.",
        },
        {
            title: "All-In-One Solution",
            description: "Capture, organize, and track everything in one clean, unified space.",
        },
        {
            title: "Comprehensive Customer Support",
            description: "Quick help via chat, FAQs, and community support whenever you need it.",
        },
        {
            title: "Smart Automation Tools",
            description: "Automate reminders, status updates, and get smart suggestions effortlessly.",
        },
    ]

    const handleGetStarted = () => {
        navigate('/signup');
    };

    return (
        <div id='home'>
            {/* Header Section */}
            <header className='container py-5 text-center' >
                <h1 className='fw-bold display-4'>Take Notes. Stay Organized.</h1>
                <p className='text-muted fs-5 mt-3'>
                    All your thoughts and ideas in one place — accessible anywhere, anytime.
                </p>
                {!isLoggedIn &&
                    <button className='btn nav-color text-white px-4 py-2 mt-4' onClick={handleGetStarted}>
                        Start Writing
                    </button>
                }
            </header>

            {/* Explore Section */}
            <section id='explore' className='bg-light py-5'>
                <div className='container'>
                    <h2 className='text-center mb-5 fw-semibold'>Explore Your Workspace</h2>
                    <div className='row g-4 justify-content-center'>
                        {[ImgCard1, ImgCard2, ImgCard3, ImgCard4].map((img, index) => (
                            <div key={index} className='col-6 col-md-3'>
                                <div className='card shadow border-dark border-1 h-100 rounded-4 overflow-hidden'>
                                    <img
                                        src={img}
                                        alt={`Card ${index + 1}`}
                                        className='card-img-top img-fluid'
                                        style={{ height: '298px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <div className='m-2 p-1 text-start'>
                                            <h4>{exploreWorkSpace[index].title}</h4>
                                        </div>
                                        <div className='m-2 p-1 text-start'>
                                            <p className='text-muted'>{exploreWorkSpace[index].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className='container py-5' id='features'>
                <div className='row text-center'>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-pencil-square fs-1 text-primary'></i>
                        <h5 className='mt-3'>Rich Note Editor</h5>
                        <p className='text-muted'>You can update the state of your notes dynamically along with Title and Description.</p>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-cloud-check fs-1 text-success'></i>
                        <h5 className='mt-3'>Auto Sync</h5>
                        <p className='text-muted'>Your notes are always saved in the cloud and accessible across devices.</p>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-shield-lock fs-1 text-warning'></i>
                        <h5 className='mt-3'>Private & Secure</h5>
                        <p className='text-muted'>We maintain data with users separately. Your notes are yours and yours only.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-dark text-white pt-5 pb-4'>
                <div className='container text-center text-md-left'>
                    <div className='row'>

                        {/* Brand Section */}
                        <div className='col-md-6'>
                            <h5 className='mb-3'>OrganizeIt</h5>
                            <p className='text-muted'>
                                Built for thinkers, dreamers, and doers. Organize your ideas and tasks effortlessly.
                            </p>
                        </div>

                        {/* Links Section */}
                        <div className='col-md-3'>
                            <h6 className='mb-3'>Quick Links</h6>
                            <ul className='list-unstyled'>
                                <li><a href='#home' className='text-white-50 text-decoration-none'>Home</a></li>
                                <li><a href='#explore' className='text-white-50 text-decoration-none'>Explore</a></li>
                                <li><a href='#features' className='text-white-50 text-decoration-none'>Features</a></li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div className='col-md-3'>
                            <h6 className='mb-3'>Follow Us</h6>
                            <Link to='https://www.facebook.com' target='_blank' className='text-white-50 me-3'><i className='fab fa-facebook-f'></i></Link>
                            <Link to='https://www.twitter.com' target='_blank' className='text-white-50 me-3'><i className='fab fa-twitter'></i></Link>
                            <Link to='https://www.linkedin.com' target='_blank' className='text-white-50'><i className='fab fa-linkedin-in'></i></Link>
                        </div>
                    </div>

                    <hr className='border-top mt-4' />

                    <div className='text-center'>
                        <p className='mb-0'>&copy; {new Date().getFullYear()} <strong>OrganizeIt</strong>. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Home