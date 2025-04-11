import React, { useState } from 'react';
import './quizScreen.scss';
import { Navbar } from '../../components/navbar/navbar.jsx';
import TinderCards from '../../components/quizCards/quizCards.jsx';
import { HeaderTimer } from '../../components/headerTimer/headerTimer.jsx';

export const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  
  const handleQuestionChange = (newQuestionIndex) => {
    setCurrentQuestion(newQuestionIndex);
    setTimeExpired(false); // Reset the time expired flag when question changes
  };
  
  const handleTimeExpired = () => {
    setTimeExpired(true);
  };
  
  return (
    <section className='quizBody'>
      <HeaderTimer 
        currentQuestion={currentQuestion} 
        onTimeExpired={handleTimeExpired} 
      />
      <TinderCards 
        onQuestionChange={handleQuestionChange} 
        timeExpired={timeExpired} 
      />
      <Navbar />
    </section>
  );
};