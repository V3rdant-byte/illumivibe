import React from 'react';
import './MainPage.css';
import logo from '../../assets/logo.svg';
import LoginButton from '../../components/Loginout/LoginButton';

export const MainPage = () => {
  return (
      <div className='mp-container'>
        <div className='mp-logo'>
            <img src={logo} alt="logo" />
        </div>
        <div className='mp-title'>
            IllumiVibe
        </div>
        <div className='mp-description'>
            Your vibe, your light. A flashy personal light effect editor.
            Brought to you by team L2C-30, CPEN391 2022 spring.
        </div>
        <div className='mp-login'>
            <LoginButton />
        </div>
      </div>
  );
}
