import React, { useEffect, useState } from 'react';
import './challengeSection.scss';

export const ChallengeSection = () => {
  const [userName, setUserName] = useState('');
  const [goals, setGoals] = useState({ glass: 0, paper: 0, plastic: 0 });
  
  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      setUserName(name);
    }

    // Get user's goals from the API
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/goals/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setGoals(data);  // Assuming the response is { glass: 20, paper: 20, plastic: 20 }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  return (
    <section className='challengeSection'>
      <header className='challengeHeader'>
        <h2>Welcome {userName}! <br />Here are your goals for today</h2>
      </header>
      <div className='collectionSection'>
        <h2>Collect the following items:</h2>
        <p><strong>Glass:</strong> Collect {goals.glass} items of glass</p>
        <p><strong>Paper:</strong> Collect {goals.paper} items of paper</p>
        <p><strong>Plastic:</strong> Collect {goals.plastic} items of plastic</p>
      </div>
    </section>
  );
};
