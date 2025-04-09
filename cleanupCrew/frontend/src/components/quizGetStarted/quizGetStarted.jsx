import React from 'react';
import './quizGetStarted.scss';

export const QuizGetStarted = () => {
  return (
    <section className='quizGetStartedSection'>
        <div className='quizGetStartedWrapper'>
          <div className='quizTime' >
            <h2>
              Quiz Time!
            </h2>
          </div>
        <button className='quizGetStartedButton'>
            <a className='quizButtonText'>Get Started</a>
        </button>
        <div className='quizGetStartedText'>
            <p>Flip the cards left or right. For each correct answer you will gain 1 point</p>
        </div>
        </div>
    </section>
  );
};