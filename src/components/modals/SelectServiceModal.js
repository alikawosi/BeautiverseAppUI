import {View} from 'react-native';
import React from 'react';
import {Button, ModalWrapper} from '../commons';
import tw from '../../../tailwind';
import {Services} from '../screens/Profile';

const SelectServiceModal = () => {
  return (
    <ModalWrapper
      title={'Select Service'}
      titleSeparator
      type="fromBottom"
      style={tw`w-full h-auto bg-white rounded-[30px]`}>
      <View style={tw.style('w-11/12 self-center flex-col')}>
        <Services />
        <Button title={'Confirm'} primary />
      </View>
    </ModalWrapper>
  );
};

export {SelectServiceModal};
