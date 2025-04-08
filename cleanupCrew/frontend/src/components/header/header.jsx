import React, { useEffect, useState } from 'react';
import './header.scss';
import cleanupLogo from "../../assets/images/cleanupLogo.png";

export const Header = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Retrieve the "user" object from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the JSON and extract the "escore" property
      const user = JSON.parse(storedUser);
      // Set the score using the "escore" value (convert to integer if needed)
      setScore(parseInt(user.score, 10));
    }
  }, []);

  return (
    <section className='headerSection'>
      <img className='headerLogo' src={cleanupLogo} alt="headerLogo" />
      <p className='headerPoints'>{score} points</p>  {/* Display the score from the "user" object in localStorage */}
    </section>
  );
};
