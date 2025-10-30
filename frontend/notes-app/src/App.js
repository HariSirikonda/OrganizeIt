import React from 'react';
import './App.css';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import profile from './pages/profile';
import Notespage from './pages/Notespage';
import LoginPage from './pages/LoginPage';
import AnalyticsPage from './pages/Analytics';
import Navbar from './components/Navbar';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '411217303166-2n3f3q2r4s5t6u7v8w9x0y1z2a3b4c5d.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/home' Component={Home} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/signup' Component={SignUp} />
            <Route path='/notes' Component={Notespage} />
            <Route path='/profile' Component={profile} />
            <Route path='/analytics' Component={AnalyticsPage} />
            <Route path='/forgot-password' Component={ForgotPassword} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
