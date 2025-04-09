import React from 'react';
import './homepage.scss';
import { Navbar }  from '../../components/navbar/navbar.jsx'
import { Header }  from '../../components/header/header.jsx'
import { ChallengeSection }  from '../../components/challengeSection/challengeSection.jsx'
import { ProgressTracker }  from '../../components/progressTracker/progressTracker.jsx'
import { AddTrash }  from '../../components/addTrash/addTrash.jsx'


export const Homepage = () => {
  return (
    <section className='homepageBody'>
      <Header/>
      <ChallengeSection/>
      <ProgressTracker/>
      <AddTrash/>
      <Navbar/>
    </section>
  );
};