import React, { useEffect, useState } from 'react';
import './header.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const Header = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Get the token from localStorage or another place where you store it
    const token = localStorage.getItem('token');

    // Check if there is a token
    if (token) {
      fetch('http://localhost:5000/api/user/score', {  // Change the URL as needed
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add the token in the headers
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.score !== undefined) {
            setScore(data.score);  // Update the score
          }
        })
        .catch(error => {
          console.error('Error fetching score:', error);
        });
    }
  }, []);

  return (
    <section className='headerSection'>
      <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
      <p className='headerPoints'>{score} points</p>  {/* Display the score */}
    </section>
  );
};
