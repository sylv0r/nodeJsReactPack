import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function LoginAndRegister() {
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@"`]+@[^\s@'"`]+\.[^\s@'"`]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

  async function getConnection() {
    const email = document.querySelector('input[name=email]').value;
    const password = document.querySelector('input[name=password]').value;
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    fetch('http://localhost:3001/users/getConnection', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })})
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          sessionStorage.setItem('token', data.token);
          history('/');
          setErrorMessage('');
        } else {
          setErrorMessage(data.message);
        }
      });
  }

  async function register() {
    const email = document.querySelector('input[name=email]').value;
    const password = document.querySelector('input[name=password]').value;

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password should be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter and 1 number');
      return;
    }

    fetch('http://localhost:3001/users/postUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })})
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          sessionStorage.setItem('token', data.token);
          history('/');
          setErrorMessage('');
        } else {
          setErrorMessage(data.message);
        }
      });
    }

  return (
    <div>
      <div className="buttonLoginPage">
        <div>
          <button onClick={() => setLogin(false)}>
            SignUp
          </button>
        </div>
        <div>
          <button onClick={() => setLogin(true)}>
            SignIn
          </button>
        </div>
      </div>
      <h1>{login ? 'SignIn' : 'SignUp'}</h1>
      <input className="inputLogin" name="email" placeholder="Email" />
      <br />
      <input className="inputLogin" name="password" type="password" placeholder="Password" />
      <br />
      <button className='button-home' onClick={() => (login ? getConnection() : register())}>{login ? 'SignIn' : 'SignUp'}</button>
      <br />
      <p>{errorMessage}</p>
    </div>
  );
}
