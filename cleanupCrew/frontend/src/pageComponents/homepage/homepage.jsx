import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyGoals, getDailyProgress, setAuthToken, addTrash } from '../../api.js';
import './homepage.scss';
import { Navbar } from '../../components/navbar/navbar.jsx';
import { Header } from '../../components/header/header.jsx';
import { ChallengeSection } from '../../components/challengeSection/challengeSection.jsx';
import { ProgressTracker } from '../../components/progressTracker/progressTracker.jsx';
import { AddTrash } from '../../components/addTrash/addTrash.jsx';

export const Homepage = () => {
  const [goals, setGoals] = useState({ glass: 20, paper: 20, plastic: 20 }); // Valeurs par défaut
  const [progress, setProgress] = useState({ glass: 0, paper: 0, plastic: 0 }); // Valeurs par défaut
  const [score, setScore] = useState(0); // État pour le score
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Rediriger vers la page de login si aucun token
          return;
        }
        setAuthToken(token);

        // Fetch user details to update localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          throw new Error('User data not found in localStorage');
        }
        const user = JSON.parse(storedUser);
        const userDetailsResponse = await fetch(`http://localhost:3000/api/users/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!userDetailsResponse.ok) {
          throw new Error(`Failed to fetch user details: ${userDetailsResponse.statusText}`);
        }
        const userDetails = await userDetailsResponse.json();
        localStorage.setItem('user', JSON.stringify({
          id: userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
          score: userDetails.score || 0
        }));
        setScore(userDetails.score || 0);

        // Fetch daily goals
        const goalsData = await getDailyGoals();
        setGoals(goalsData);

        // Fetch daily progress
        const progressData = await getDailyProgress();
        setProgress(progressData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        if (err.message.includes('Unauthorized') || err.message.includes('Failed to fetch')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  // Function to handle adding trash and refreshing progress
  const handleAddTrash = async (type, quantity = 1) => {
    try {
      await addTrash(type, quantity);
      // Refresh progress after adding trash
      const progressData = await getDailyProgress();
      setProgress(progressData);

      // Refresh user details
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const user = JSON.parse(storedUser);
      const userDetailsResponse = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userDetailsResponse.ok) {
        throw new Error(`Failed to fetch user details: ${userDetailsResponse.statusText}`);
      }
      const userDetails = await userDetailsResponse.json();
      localStorage.setItem('user', JSON.stringify({
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        score: userDetails.score || 0
      }));
      setScore(userDetails.score || 0);
    } catch (err) {
      setError(err.message || 'An error occurred while adding trash');
    }
  };

  return (
    <section className="homepageBody">
      <Header score={score} />
      <ChallengeSection />
      <ProgressTracker goals={goals} progress={progress} />
      <AddTrash onAddTrash={handleAddTrash} />
      {error && <p className="error">{error}</p>}
      <Navbar />
    </section>
  );
};