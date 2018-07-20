import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="" />
    </header>
  );
};

export default Header;
