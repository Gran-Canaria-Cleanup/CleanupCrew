import React from 'react';
import './quizWellDone.scss';
import { Link }  from "react-router-dom"

export const QuizWellDone = () => {
  return (
    <section className='quizWellDoneSection'>
        <div className='quizWellDoneWrapper'>
          <div className='wellDone' >
            <h2>
              Well Done!
            </h2>
          </div>
        <button className='quizWellDoneButton'>
            <Link className='quizButtonText' to="/homepage">Go to main page</Link>
        </button>
        <div className='quizGetStartedText'>
            <p> Your overall score will be calculated and displayed on the main page</p>
        </div>
        </div>
    </section>
  );
};