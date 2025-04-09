import React from 'react';
import './header.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const Header = ({ score }) => {
  return (
    <section className='headerSection'>
      <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
      <p className='headerPoints'>{score || 0} points</p>
    </section>
  );
};