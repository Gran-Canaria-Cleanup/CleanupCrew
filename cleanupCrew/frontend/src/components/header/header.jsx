import React from 'react';
import './header.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const Header = () => {
  return (
    <section className='headerSection'>
    <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
    <p className='headerPoints'>10 points</p>
    </section>
  );
};