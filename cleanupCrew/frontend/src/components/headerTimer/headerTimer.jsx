import React, { useState, useEffect } from 'react';
import './headerTimer.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const HeaderTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // clean up on unmount
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <section className='headerSection'>
      <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
      <h2 className='timer'>{formatTime(timeLeft)}</h2>
    </section>
  );
};
