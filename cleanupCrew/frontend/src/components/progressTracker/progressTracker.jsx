import React, { useEffect, useState } from 'react';
import './progressTracker.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProgressTracker = () => {
  const [goals, setGoals] = useState({ glass: 0, paper: 0, plastic: 0 });
  const [collected, setCollected] = useState({ glass: 16, paper: 9, plastic: 15 }); // Example collected items

  useEffect(() => {
    // Fetch goals from the API
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/goals/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is available
          }
        });
        const data = await response.json();
        setGoals(data); // Assuming the response is { glass: 20, paper: 20, plastic: 20 }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  // Calculate percentage for a given type
  const calculatePercentage = (collectedItems, totalItems) => {
    return (collectedItems / totalItems) * 100;
  };

  // Calculate the overall total percentage for all garbage types
  const totalCollected = collected.glass + collected.paper + collected.plastic;
  const totalGoals = goals.glass + goals.paper + goals.plastic;
  const totalPercentage = totalGoals > 0 ? (totalCollected / totalGoals) * 100 : 0;

  return (
    <>
      <h2 className='progressTodayText'>Your progress today</h2>
      <section className='progressSection'>
        <div className='progressToday'>
          <div className='collectWrapper'>
            <div className='glassCircle'></div>
            <p>Glass - {collected.glass}/<span>{goals.glass}</span> collected</p> {/* Only the goal is dynamic */}
          </div>
          <div className='collectWrapper'>
            <div className='paperCircle'></div>
            <p>Paper - {collected.paper}/<span>{goals.paper}</span> collected</p> {/* Only the goal is dynamic */}
          </div>
          <div className='collectWrapper'>
            <div className='plasticCircle'></div>
            <p>Plastic - {collected.plastic}/<span>{goals.plastic}</span> collected</p> {/* Only the goal is dynamic */}
          </div>
        </div>
        
        <section className='circleProgressSection'>
          <CircularProgressbar
            value={calculatePercentage(collected.glass, goals.glass)}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: '#A8DF8A'
            })}
          />
          <div className='paperProgress'>
            <CircularProgressbar
              value={calculatePercentage(collected.paper, goals.paper)}
              strokeWidth={7}
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#6EB7EB'
              })}
            />
            <div className='plasticProgress'>
              <CircularProgressbar
                value={calculatePercentage(collected.plastic, goals.plastic)}
                strokeWidth={8}
                text={`${Math.round(totalPercentage)}% Done`} // Now shows the total percentage
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  pathColor: '#F6D65D',
                  textSize: '14px',
                  textColor: 'black'
                })}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
