import React from 'react';
import './progressTracker.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ProgressTracker = ({ goals, progress }) => {
  // Calculate individual progress percentages
  const glassPercentage = goals.glass > 0 ? (progress.glass / goals.glass) * 100 : 0;
  const paperPercentage = goals.paper > 0 ? (progress.paper / goals.paper) * 100 : 0;
  const plasticPercentage = goals.plastic > 0 ? (progress.plastic / goals.plastic) * 100 : 0;

  // Calculate overall progress percentage
  const totalTarget = (goals.glass || 0) + (goals.paper || 0) + (goals.plastic || 0);
  const totalCollected = (progress.glass || 0) + (progress.paper || 0) + (progress.plastic || 0);
  const overallPercentage = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;

  return (
    <>
      <h2 className="progressTodayText">Your progress today</h2>
      <section className="progressSection">
        <div className="progressToday">
          <div className="collectWrapper">
            <div className="glassCircle"></div>
            <p>Glass - {progress.glass || 0}/{goals.glass || 20} collected</p>
          </div>
          <div className="collectWrapper">
            <div className="paperCircle"></div>
            <p>Paper - {progress.paper || 0}/{goals.paper || 20} collected</p>
          </div>
          <div className="collectWrapper">
            <div className="plasticCircle"></div>
            <p>Plastic - {progress.plastic || 0}/{goals.plastic || 20} collected</p>
          </div>
        </div>
        <section className="circleProgressSection">
          <CircularProgressbar
            value={glassPercentage}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: '#A8DF8A', // Vert pour le verre
            })}
          />
          <div className="paperProgress">
            <CircularProgressbar
              value={paperPercentage}
              strokeWidth={7}
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#6EB7EB', // Bleu pour le papier
              })}
            />
            <div className="plasticProgress">
              <CircularProgressbar
                value={plasticPercentage}
                strokeWidth={8}
                text={`${overallPercentage}% Done`}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  pathColor: '#F6D65D', // Jaune pour le plastique
                  textSize: '14px',
                  textColor: 'black',
                })}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};