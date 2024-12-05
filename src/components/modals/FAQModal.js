import {Text} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';
import {FAKE_CONST} from '../../constants';

const FAQModal = ({style}) => {
  return (
    <ModalWrapper
      titleSeparator
      title="FAQs"
      type="fromBottom"
      style={tw.style('w-full h-auto bg-white rounded-[30px] px-5', style)}>
      <Text>{FAKE_CONST.FAQs[0]}</Text>
    </ModalWrapper>
  );
};

export {FAQModal};
