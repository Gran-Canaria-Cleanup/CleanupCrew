import React from 'react';
import './startLogo.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const StartLogo = () => {
  return (
    <section className='startLogoSection'>
    <img className='startLogo' src={cleanupLogo} alt="startLogo" />
    </section>
  );
};