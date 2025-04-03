import React from 'react';
import './socialLogin.scss';
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import search from "../../assets/images/search.png";

export const SocialLogin = () => {
  return (
    <section className='socialLogin'>
        <div className='logoLogin'> 
            <img className='mediaLogin' src={facebook} alt="Facebook" />
            <img className='mediaLogin' src={search} alt="Google" />
            <img className='mediaLogin' src={instagram} alt="Instagram" />
        </div>
        <div className='socialLinks'>
            <a href="">New to CleanUp? <span className='loginSpan'>Click here!</span></a>
            <a href=""><span className='loginSpan'>Forgot your password?</span></a>
        </div>
    </section>
  );
};