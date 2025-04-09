import React from 'react';
import './App.scss';
import { SplashScreen } from '../src/pageComponents/splashScreen/splashScreen.jsx';
import { LoginScreen } from '../src/pageComponents/loginScreen/loginScreen.jsx';
import { Homepage } from '../src/pageComponents/homepage/homepage.jsx';
import { MapScreen } from '../src/pageComponents/map/mapScreen.jsx';
import { ProfileScreen } from '../src/pageComponents/profile/profileScreen.jsx';
import { QuizScreen } from '../src/pageComponents/quiz/quizScreen.jsx';
import { StatsScreen } from '../src/pageComponents/stats/statsScreen.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuizSplashScreen } from '../src/pageComponents/quizSplashScreen/quizSplashScreen.jsx';
import { QuizEndScreen } from '../src/pageComponents/quizEndScreen/quizEndScreen.jsx';


// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} /> {/* Splash screen */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login page */}
        <Route
          path="/homepage"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        /> {/* Protected Home page */}
        <Route path="/map" element={<MapScreen />} /> {/* Map page */}
        <Route path="/profile" element={<ProfileScreen />} /> {/* Profile page */}
        <Route path="/quiz" element={<QuizScreen />} /> {/* Quiz page */}
        <Route path="/quizSplash" element={<QuizSplashScreen />} /> {/* Quiz Splash page */}
        <Route path="/quizend" element={<QuizEndScreen />} /> {/* Quiz End page */}
        <Route path="/stats" element={<StatsScreen />} /> {/* Stats page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
