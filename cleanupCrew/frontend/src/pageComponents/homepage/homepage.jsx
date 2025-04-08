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

        // Fetch daily goals
        const goalsData = await getDailyGoals();
        setGoals(goalsData);

        // Fetch daily progress
        const progressData = await getDailyProgress();
        setProgress(progressData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        if (err.message.includes('Unauthorized')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  // Function to handle adding trash and refreshing progress
  const handleAddTrash = async (type) => {
    try {
      await addTrash(type);
      // Refresh progress after adding trash
      const progressData = await getDailyProgress();
      setProgress(progressData);
    } catch (err) {
      setError(err.message || 'An error occurred while adding trash');
    }
  };

  return (
    <section className="homepageBody">
      <Header />
      <ChallengeSection />
      <ProgressTracker goals={goals} progress={progress} />
      <AddTrash onAddTrash={handleAddTrash} />
      {error && <p className="error">{error}</p>}
      <Navbar />
    </section>
  );
};