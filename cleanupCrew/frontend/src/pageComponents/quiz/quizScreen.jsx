import React from 'react';
import './quizScreen.scss';
import { Navbar } from '../../components/navbar/navbar.jsx';
import TinderCards from '../../components/quizCards/quizCards.jsx';

export const QuizScreen = () => {
  
  return (
    <section className='quizBody'>
      <TinderCards/>
      <Navbar/>
    </section>
  );
};