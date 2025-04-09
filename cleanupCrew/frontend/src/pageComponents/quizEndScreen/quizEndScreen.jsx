import React from 'react';
import './quizEndScreen.scss';
import { StartLogo }  from '../../components/startLogo/startLogo.jsx'
import { QuizWellDone } from '../../components/quizWellDone/quizWellDone.jsx';


export const QuizEndScreen = () => {
  return (
    <section className='quizSplashBody'>
      <StartLogo/>
      <QuizWellDone/>
    </section>
  );
};