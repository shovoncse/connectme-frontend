import React from 'react';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
const FullLogo = () => {
  return (
    <Link className="block mb-2" to="/">
      <div className="sideNav__logoHolder">
        <img src={Logo} alt="Connectme Logo" className="sideNav__logo" />
      </div>
    </Link>
  );
};

export default FullLogo;
