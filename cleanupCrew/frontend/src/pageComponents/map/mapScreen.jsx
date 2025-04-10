import React from 'react';
import './mapScreen.scss';
import { Navbar } from '../../components/navbar/navbar.jsx';
import { MapSection } from '../../components/map/map.jsx';

export const MapScreen = () => {
  
  return (
    <section className='mapBody'>
      <MapSection/>
      <Navbar/>
    </section>
  );
};