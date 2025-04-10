import React, { useState } from 'react';
import './loginSection.scss';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api.js';

export const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const data = await loginUser(email, password);
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      // Redirect to homepage
      navigate('/homepage');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <section className='loginSection'>
      <form onSubmit={handleLogin} className='loginForm'>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='loginButton'>
          <span className='loginButtonText'>Get Started</span>
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
};