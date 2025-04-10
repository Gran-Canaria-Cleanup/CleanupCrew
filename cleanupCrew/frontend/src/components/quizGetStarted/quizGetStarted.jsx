import React from 'react';
import './quizGetStarted.scss';
import { Link } from "react-router-dom";

export const QuizGetStarted = () => {
  return (
    <section className='quizGetStartedSection'>
        <div className='quizGetStartedWrapper'>
          <div className='quizTime' >
            <h2>
              Quiz Time!
            </h2>
          </div>

        <Link className='quizButton' to="/quiz">
        <button className='quizGetStartedButton'>
            <p className='quizButtonText'>Get Started</p>
        </button>
        </Link>

        <div className='quizGetStartedText'>
            <p>Flip the cards left or right. For each correct answer you will gain 1 point</p>
        </div>
        </div>
    </section>
  );
};