import React from 'react';
import logoImg from '../disrupt_logo.png'; 
import { useLocation } from 'react-router-dom';

function Logo() {
  const location = useLocation();
  if (location.pathname === '/messaging') {
    return null;
  }
  return <img src={logoImg} alt="Logo" className="logo" />;
}

export default Logo;
