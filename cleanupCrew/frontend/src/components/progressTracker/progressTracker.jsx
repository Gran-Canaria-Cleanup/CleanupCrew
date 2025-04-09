import React from 'react';
import './progressTracker.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 66;

export const ProgressTracker = () => {
  return (
    <>
    <h2 className='progressTodayText'>Your progress today</h2>
    <section className='progressSection'>
        <div className='progressToday'>
            <div className='collectWrapper'>
            <div className='glassCircle'></div>   <p>Glass - 16/20 collected</p>
            </div>
            <div className='collectWrapper'>
            <div className='paperCircle'></div>   <p>Paper - 9/20 collected</p>
            </div>
            <div className='collectWrapper'>
            <div className='plasticCircle'></div> <p>Plastic - 15/20 collected</p>
            </div>
        </div>
    <section className='circleProgressSection'>
      <CircularProgressbar
        value={percentage}
        strokeWidth={5}
        styles={buildStyles({
          strokeLinecap: 'butt',
          pathColor: '#A8DF8A'
        })}
      />
      <div className='paperProgress'>
      <CircularProgressbar
        value={percentage}
        strokeWidth={7}
        styles={buildStyles({
          strokeLinecap: 'butt',
          pathColor: '#6EB7EB'
        })}
      />
      <div className='plasticProgress'>
      <CircularProgressbar
        value={percentage}
        strokeWidth={8}
        text='50% Done'
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