import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import HomeImg from '../assets/notesIllustration.png';
import ImgCard1 from '../assets/allinone.avif';
import ImgCard2 from '../assets/workflow.avif';
import ImgCard3 from '../assets/usersupport.avif';
import ImgCard4 from '../assets/smarttools.avif';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/signup');
    };

    return (
        <div>
            <Navbar showSearch={true} showProfile={true} />
            {/* Header Section */}
            <header className='container py-5 text-center'>
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

            {/* Features Section */}
            <section id='features' className='bg-light py-5'>
                <div className='container'>
                    <h2 className='text-center mb-5 fw-semibold'>Explore Your Workspace</h2>
                    <div className='row g-4 justify-content-center'>
                        {[ImgCard1, ImgCard2, ImgCard3, ImgCard4].map((img, index) => (
                            <div key={index} className='col-6 col-md-3'>
                                <div className='card shadow-sm border-0 h-100 rounded-4 overflow-hidden'>
                                    <img
                                        src={img}
                                        alt={`Card ${index + 1}`}
                                        className='card-img-top img-fluid'
                                        style={{ height: '298px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className='container py-5'>
                <div className='row text-center'>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-pencil-square fs-1 text-primary'></i>
                        <h5 className='mt-3'>Rich Note Editor</h5>
                        <p className='text-muted'>Write in markdown or plain text. Format, highlight, and structure your notes.</p>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-cloud-check fs-1 text-success'></i>
                        <h5 className='mt-3'>Auto Sync</h5>
                        <p className='text-muted'>Your notes are always saved in the cloud and accessible across devices.</p>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <i className='bi bi-shield-lock fs-1 text-warning'></i>
                        <h5 className='mt-3'>Private & Secure</h5>
                        <p className='text-muted'>We use end-to-end encryption. Your notes are yours and yours only.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-dark text-white text-center py-4'>
                <div className='container'>
                    <p className='mb-1'>&copy; {new Date().getFullYear()} NoteSphere</p>
                    <small className='text-muted'>
                        Built for thinkers, dreamers, and doers.
                    </small>
                </div>
            </footer>
        </div>
    )
}

export default Home