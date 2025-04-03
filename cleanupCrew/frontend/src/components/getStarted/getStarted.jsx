import React from 'react';
import './getStarted.scss';

export const GetStarted = () => {
  return (
    <section className='getStartedSection'>
        <div className='getStartedWrapper'>
        <button className='getStartedButton'>
            <p>Get Started</p>
        </button>
        <div className='getStartedText'>
            <p>Recycling just got exciting! Earn points, compete with friends, and unlock achievements in a thrilling eco-race!</p>
        </div>
        </div>
    </section>
  );
};