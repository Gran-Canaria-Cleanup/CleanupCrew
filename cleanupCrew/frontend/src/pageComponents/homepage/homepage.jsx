import React from 'react';
import './homepage.scss';
import { Navbar }  from '../../components/navbar/navbar.jsx'
import { Header }  from '../../components/header/header.jsx'

export const Homepage = () => {
  return (
    <section className='homepageBody'>
      <Header/>
      <Navbar/>
    </section>
  );
};