import React from 'react';
import './loginScreen.scss';
import { LoginLogo }  from '../../components/loginLogo/loginLogo.jsx'
import { LoginSection }  from '../../components/loginSection/loginSection.jsx'
import { SocialLogin }  from '../../components/socialLogin/socialLogin.jsx'
import { LoginText }  from '../../components/logintext/loginText.jsx'

export const LoginScreen = () => {
  return (
    <section className='loginBody'>
      <LoginLogo/>
      <LoginSection/>
      <SocialLogin/>
      <LoginText/>
    </section>
  );
};