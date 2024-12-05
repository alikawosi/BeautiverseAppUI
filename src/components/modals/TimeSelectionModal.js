import {View} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';
import {TimeSelection} from '../screens/Booking';

const TimeSelectionModal = () => {
  return (
    <ModalWrapper
      titleSeparator
      title={'AvailableTime'}
      type="fromBottom"
      style={tw`w-full h-auto bg-white rounded-[30px]`}>
      <View style={tw.style('w-11/12 self-center flex-col')}>
        <TimeSelection horizontal={false} numColumns={3} />
      </View>
    </ModalWrapper>
  );
};

export {TimeSelectionModal};
