import React from 'react';

import {IntroLayout} from '../../components/screens/Auth';

const AuthFirstIntro = () => {
  return (
    <IntroLayout
      image={require('../../assets/media/IntroFirstImage.png')}
      desc="Find & Book With The Best Service Professionals"
      descStyle="text-primary"
      to="SecondIntro"
    />
  );
};

export default AuthFirstIntro;
