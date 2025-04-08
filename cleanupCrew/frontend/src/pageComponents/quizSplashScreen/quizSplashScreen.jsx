import React from 'react';
import './quizSplashScreen.scss';
import { StartLogo }  from '../../components/startLogo/startLogo.jsx'
import { QuizGetStarted } from '../../components/quizGetStarted/quizGetStarted.jsx';


export const QuizSplashScreen = () => {
  return (
    <section className='quizSplashBody'>
      <StartLogo/>
      <QuizGetStarted/>
    </section>
  );
};