//navbar 1 button to go /login and 1 button to go /addallergie
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
    const history = useNavigate();
    
    return (
        <div className='navbar'>
        <button className='navbar-button' onClick={() => history('/login')}>
            Login
        </button>
        <button className='navbar-button' onClick={() => history('/')}>
            Home
        </button>
        <button className='navbar-button' onClick={() => history('/data')}>
            Add Data
        </button>
        <button className='navbar-button' onClick={() => history('/admin')}>
            Admin
        </button>
        </div>
    );
    }
    