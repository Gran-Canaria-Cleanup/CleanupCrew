import React from 'react';
import './getStarted.scss';
import { Link } from "react-router-dom";

export const GetStarted = () => {
  return (
    <section className='getStartedSection'>
        <div className='getStartedWrapper'>
        <button className='getStartedButton'>
            <Link className='buttonText' to="/login">Get Started</Link>
        </button>
        <div className='getStartedText'>
            <p>Recycling just got exciting! Earn points, compete with friends, and unlock achievements in a thrilling eco-race!</p>
        </div>
        </div>
    </section>
  );
};