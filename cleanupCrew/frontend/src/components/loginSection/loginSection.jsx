import React from 'react';
import './loginSection.scss';
import { Link } from "react-router-dom";

export const LoginSection = () => {
  return (
    <section className='loginSection'>
        <input type="text" placeholder='Username'/>
        <input type="text" placeholder='Password'/>
        <button className='loginButton'><Link className='loginButtonText' to="/homepage">Get Started</Link></button>
    </section>
  );
};