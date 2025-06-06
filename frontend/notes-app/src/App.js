import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import profile from './pages/profile';
import Notespage from './pages/Notespage';
import LoginPage from './pages/LoginPage';
import AnalyticsPage from './pages/Analytics';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchText={searchText} />
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
  );
}

export default App;
