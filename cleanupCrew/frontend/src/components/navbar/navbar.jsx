import React from 'react';
import './navbar.scss';
import mapsvg from "../../assets/images/map.svg";
import quizsvg from "../../assets/images/quiz.svg";
import homesvg from "../../assets/images/home.svg";
import statssvg from "../../assets/images/stats.svg";
import profilesvg from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <section className='navSection'>
      <div className='navItemSection'>

        <Link className='navButton' to="/map">
          <img src={mapsvg} alt="map" />
          <span className='navClick'>Map</span>
        </Link>

        <Link className='navButton' to="/quiz">
          <img src={quizsvg} alt="quiz" />
          <span className='navClick'>Quiz</span>
        </Link>

        <Link className='navButton' to="/homepage">
          <img src={homesvg} alt="home" />
          <span className='navClick'>Home</span>
        </Link>

        <Link className='navButton' to="/stats">
          <img src={statssvg} alt="stats" />
          <span className='navClick'>Stats</span>
        </Link>

        <Link className='navButton' to="/profile">
          <img src={profilesvg} alt="profile" />
          <span className='navClick'>Profile</span>
        </Link>

      </div>
    </section>
  );
};