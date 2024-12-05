import React from 'react';
import {ArrowDown2} from 'iconsax-react-native';

import {ServiceSubscribeTime} from './FAKE_CONST';

const SUBSCRIBE_CONST = {
  subscribeFormData: [
    {
      name: 'serviceIntervalHeading',
      key: 1,
      type: 'header',
      title: 'How often do you want the service?',
    },
    {
      name: 'serviceInterval',
      type: 'select',
      placeholder: 'Select an interval',
      modalTitle: 'How often do you want the service?',
      options: ServiceSubscribeTime,
      suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      validation: 'required',
    },
    {
      name: 'serviceTimeHeading',
      type: 'header',
      title: 'How long do you want the service?',
    },
    {
      name: 'serviceTime',
      type: 'select',
      placeholder: 'Select time period for yor service',
      modalTitle: 'How long do you want the service?',
      options: ServiceSubscribeTime,
      suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      validation: 'required',
    },
  ],
};

export {SUBSCRIBE_CONST};
