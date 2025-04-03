import React from 'react';
import './splashScreen.scss';
import { StartLogo }  from '../../components/startLogo/startLogo.jsx'
import { GetStarted }  from '../../components/getStarted/getStarted.jsx'

export const SplashScreen = () => {
  
  return (
    <section className='splashBody'>
      <StartLogo/>
      <GetStarted/>
    </section>
  );
};