import React, { useState, useEffect } from 'react';
import './headerTimer.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const HeaderTimer = ({ currentQuestion, onTimeExpired }) => {
  const SECONDS_PER_QUESTION = 10;
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(SECONDS_PER_QUESTION);
  }, [currentQuestion]);

  useEffect(() => {
    // If time is up, trigger the callback to move to next question
    if (timeLeft <= 0) {
      if (onTimeExpired) {
        onTimeExpired();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // clean up on unmount
  }, [timeLeft, onTimeExpired]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <section className='headerSection'>
      <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
      <h2 className={`timer ${timeLeft <= 3 ? 'timer--danger' : ''}`}>{formatTime(timeLeft)}</h2>
    </section>
  );
};