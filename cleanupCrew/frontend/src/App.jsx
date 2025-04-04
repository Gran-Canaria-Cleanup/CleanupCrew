import React from 'react';
import './App.scss';
import { SplashScreen } from '../src/pageComponents/splashScreen/splashScreen.jsx';
import { LoginScreen } from '../src/pageComponents/loginScreen/loginScreen.jsx';
import { Homepage } from '../src/pageComponents/homepage/homepage.jsx';
import { MapScreen } from '../src/pageComponents/map/mapScreen.jsx';
import { ProfileScreen } from '../src/pageComponents/profile/profileScreen.jsx';
import { QuizScreen } from '../src/pageComponents/quiz/quizScreen.jsx';
import { StatsScreen } from '../src/pageComponents/stats/statsScreen.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />  {/* Splash screen */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login page */}
        <Route path="/homepage" element={<Homepage />} /> {/* Home page */}
        <Route path="/map" element={<MapScreen />} /> {/* Map page */}
        <Route path="/profile" element={<ProfileScreen />} /> {/* Map page */}
        <Route path="/quiz" element={<QuizScreen />} /> {/* Map page */}
        <Route path="/stats" element={<StatsScreen />} /> {/* Map page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
