import React from 'react';
import './quizScreen.scss';
import { Navbar } from '../../components/navbar/navbar.jsx';
import TinderCards from '../../components/quizCards/quizCards.jsx';
import {HeaderTimer} from '../../components/headerTimer/headerTimer.jsx'

export const QuizScreen = () => {
  
  return (
    <section className='quizBody'>
      <HeaderTimer/>
      <TinderCards/>
      <Navbar/>
    </section>
  );
};