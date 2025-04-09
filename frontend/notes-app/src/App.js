import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import profile from './pages/profile';
import Notespage from './pages/Notespage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/notes' Component={Notespage} />
          <Route path='/profile' Component={profile} />
          <Route path='/forgot-password' Component={ForgotPassword} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
