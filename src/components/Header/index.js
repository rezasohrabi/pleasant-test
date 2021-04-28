import React from 'react';
import Logo from './../../assets/images/logo192.png';

const Header = (props) => {
  return (
    <header data-test='header'>
      <img src={Logo} alt='logo' data-test='logo' />
    </header>
  );
};

export default Header;
