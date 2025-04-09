import React from 'react';
import './progressTracker.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProgressTracker = ({ goals, progress }) => {
  // Calculate percentage for the circular progress bars
  const calculatePercentage = (collectedItems, totalItems) => {
    return totalItems > 0 ? (collectedItems / totalItems) * 100 : 0;
  };

  // Calculate the overall total percentage for all garbage types
  const totalCollected = (progress.glass || 0) + (progress.paper || 0) + (progress.plastic || 0);
  const totalGoals = (goals.glass || 0) + (goals.paper || 0) + (goals.plastic || 0);
  const totalPercentage = totalGoals > 0 ? Math.round((totalCollected / totalGoals) * 100) : 0;

  return (
    <>
      <h2 className='progressTodayText'>Your progress today</h2>
      <section className='progressSection'>
        <div className='progressToday'>
          <div className='collectWrapper'>
            <div className='glassCircle'></div>
            <p>Glass - {progress.glass || 0}/<span>{goals.glass || 20}</span> collected</p>
          </div>
          <div className='collectWrapper'>
            <div className='paperCircle'></div>
            <p>Paper - {progress.paper || 0}/<span>{goals.paper || 20}</span> collected</p>
          </div>
          <div className='collectWrapper'>
            <div className='plasticCircle'></div>
            <p>Plastic - {progress.plastic || 0}/<span>{goals.plastic || 20}</span> collected</p>
          </div>
        </div>
        
        <section className='circleProgressSection'>
          <CircularProgressbar
            value={calculatePercentage(progress.glass || 0, goals.glass || 20)}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: '#A8DF8A'
            })}
          />
          <div className='paperProgress'>
            <CircularProgressbar
              value={calculatePercentage(progress.paper || 0, goals.paper || 20)}
              strokeWidth={7}
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#6EB7EB'
              })}
            />
            <div className='plasticProgress'>
              <CircularProgressbar
                value={calculatePercentage(progress.plastic || 0, goals.plastic || 20)}
                strokeWidth={8}
                text={`${totalPercentage}% Done`}
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