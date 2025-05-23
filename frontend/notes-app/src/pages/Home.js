import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import HomeImg from '../assets/notesLady.png';
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
            {/* Hero Section */}
            <section id='home' className='bg-white py-5 border-bottom'>
                <div className='container d-flex flex-wrap align-items-center justify-content-between'>
                    <div className='p-3' style={{ maxWidth: '540px' }}>
                        <h1 className='fw-bold'>Communicate. Collaborate. <br />Create...</h1>
                        <p className='mt-3 text-secondary'>
                            OrganizeIt provides an effective and powerful way to manage your tasks and bring your ideas to life.
                        </p>
                        {!isLoggedIn && (
                            <button className='btn btn-primary mt-3 shadow-sm' onClick={handleGetStarted}>
                                Get Started
                            </button>
                        )}
                    </div>
                    <div className='p-3'>
                        <img
                            className='img-fluid'
                            src={HomeImg}
                            alt='OrganizeIt Hero'
                            style={{ maxWidth: '500px', borderRadius: '1rem' }}
                        />
                    </div>
                </div>
            </section>

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

            {/* Features Section */}
            <section id='about' className="container py-5">
                <h2 className="text-center mb-4">Why Choose OrganizeIt?</h2>
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                        <h5 className="mt-3">Cloud Sync</h5>
                        <p>Your notes are automatically saved and accessible from anywhere.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-shield-check fs-1 text-success"></i>
                        <h5 className="mt-3">Private & Secure</h5>
                        <p>End-to-end encryption ensures your ideas stay yours.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-lightning-charge fs-1 text-warning"></i>
                        <h5 className="mt-3">Fast & Intuitive</h5>
                        <p>Designed for productivity with a distraction-free interface.</p>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section className='bg-white py-5 border-top'>
                <div className='container'>
                    <h2 className='text-center mb-4 fw-semibold'>Contact Us</h2>
                    <p className='text-center mb-5 text-muted'>
                        Have questions or suggestions? We'd love to hear from you!
                    </p>
                    <div className='row justify-content-center'>
                        <div className='col-md-8'>
                            <form>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='form-label'>Name</label>
                                    <input type='text' className='form-control' id='name' placeholder='Your Name' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>Email</label>
                                    <input type='email' className='form-control' id='email' placeholder='you@example.com' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='message' className='form-label'>Message</label>
                                    <textarea className='form-control' id='message' rows='4' placeholder='Your message'></textarea>
                                </div>
                                <button type='submit' className='btn nav-color text-white px-4'>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Demo or Preview */}
            <section className="container-fluid bg-white py-5 border-top">
                <div className="container d-flex align-items-center justify-content-center flex-column">
                    <h2 className="mb-4">See It in Action</h2>
                    <div className="ratio ratio-16x9" style={{ maxWidth: '800px' }}>
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video
                            title="OrganizeIt Demo"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container py-5">
                <h2 className="text-center mb-5">What Our Users Say</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                        <blockquote className="blockquote">
                            <p>"This app changed the way I organize work. Super clean and effective!"</p>
                            <footer className="blockquote-footer">Aarav, Developer</footer>
                        </blockquote>
                    </div>
                    <div className="col-md-4">
                        <blockquote className="blockquote">
                            <p>"Perfect for journaling and taking lecture notes. Love the sync feature."</p>
                            <footer className="blockquote-footer">Sneha, Student</footer>
                        </blockquote>
                    </div>
                    <div className="col-md-4">
                        <blockquote className="blockquote">
                            <p>"Minimal UI, powerful features. Can’t imagine a day without it!"</p>
                            <footer className="blockquote-footer">Rakesh, Manager</footer>
                        </blockquote>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="nav-color text-white mt-5 pt-4 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <h5>OrganizeIt</h5>
                            <p className="small">
                                The smart way to take notes, plan your day, and stay productive. Your ideas, organized.
                            </p>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h6>Quick Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
                                <li><a href="#features" className="text-white text-decoration-none">Features</a></li>
                                <li><a href="#about" className="text-white text-decoration-none">About</a></li>
                                <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
                            </ul>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h6>Follow Us</h6>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-white"><i className="bi bi-facebook fs-4"></i></a>
                                <a href="#" className="text-white"><i className="bi bi-twitter fs-4"></i></a>
                                <a href="#" className="text-white"><i className="bi bi-instagram fs-4"></i></a>
                                <a href="#" className="text-white"><i className="bi bi-github fs-4"></i></a>
                            </div>
                        </div>
                    </div>

                    <hr className="border-secondary" />

                    <div className="text-center small">
                        © {new Date().getFullYear()} OrganizeIt. All rights reserved.
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Home