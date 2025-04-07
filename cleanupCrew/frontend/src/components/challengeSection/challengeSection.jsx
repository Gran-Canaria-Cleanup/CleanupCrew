import React from 'react';
import './challengeSection.scss';

export const ChallengeSection = () => {
  return (
    <section className='challengeSection'>
    <header className='challengeHeader'>
        <h2>Welcome Name! <br />Here are your goals for today</h2>
    </header>
        <div className='collectionSection'> 
            <h2>Collect the following items:</h2>
            <p><strong>Glass:</strong> Collect 20 items of glass</p>
            <p><strong>Paper:</strong> Collect 20 items of paper</p>
            <p><strong>Plastic:</strong> Collect 20 items of plastic</p>
        </div>
    </section>
    
  );
};