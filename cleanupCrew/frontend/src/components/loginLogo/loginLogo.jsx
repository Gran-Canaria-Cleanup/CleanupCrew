import React from 'react';
import './loginLogo.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const LoginLogo = () => {
  return (
    <section className='loginLogoSection'>
    <img className='loginLogo' src={cleanupLogo} alt="loginLogo" />
    </section>
  );
};