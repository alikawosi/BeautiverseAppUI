import React from 'react';
import {ArrowDown2} from 'iconsax-react-native';

import {GENERAL_CONST} from './GENERAL_CONST';

const AUTH_CONST = {
  registerFormData: [
    {
      name: 'firstName',
      type: 'input',
      label: 'First Name',
      validation: 'required',
    },
    {
      name: 'lastName',
      type: 'input',
      label: 'Last Name',
      validation: 'required',
    },
    {
      name: 'gender',
      type: 'select',
      options: GENERAL_CONST.GenderData,
      iconShow: true,
      itemStyle: 'w-[48%]  mr-[2%]',
      label: 'Gender',
      //suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      validation: 'required',
    },
    {
      name: 'birthDate',
      type: 'datePicker',
      itemStyle: 'w-[48%]  ml-[2%]',
      label: 'Date Of Birth',
      title: 'Birthday',
      validation: 'required',
    },
    {
      name: 'email',
      type: 'input',
      label: 'Email',
      validation: 'required|email',
    },
  ],
  socialsIcon: [
    {
      id: 'google',
      image: require('../assets/media/googleLogo.png'),
    },
    // {
    //   id: 'fb',
    //   image: require('../assets/media/facebookLogo.png'),
    // },
    {
      id: 'apple',
      image: require('../assets/media/appleLogo.png'),
    },
  ],
};

export {AUTH_CONST};
