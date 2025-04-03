import React from 'react';
import './App.scss';
import { SplashScreen } from '../src/pageComponents/splashScreen/splashScreen.jsx';
import { LoginScreen } from '../src/pageComponents/loginScreen/loginScreen.jsx';
import { Homepage } from '../src/pageComponents/homepage/homepage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />  {/* Splash screen */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login page */}
        <Route path="/homepage" element={<Homepage />} /> {/* Home page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
