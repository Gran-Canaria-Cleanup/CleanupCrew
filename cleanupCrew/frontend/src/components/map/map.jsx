import React from 'react';
import './map.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const MapSection = () => {
  const googleMapsUrl = 'https://www.google.com/maps?q=28.1235,-15.4363';

  return (
    <div style={{ position: 'relative' }}>
      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: '#A8DF8A',
          padding: '8px 12px',
          borderRadius: '8px',
          textDecoration: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          fontWeight: 'bold',
          color: '#000'
        }}
      >
        Open in Maps
      </a>
      
      <MapContainer 
        className='MapContainer' 
        center={[28.1235, -15.4363]} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "91vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};