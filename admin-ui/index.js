import React from 'react';
import Logo from '../public/images/logo.png';

const LogoContainer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Logo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 250,
        height: 250
      }}></div>
  );
};

export default {
  logo: () => <LogoContainer />
};
