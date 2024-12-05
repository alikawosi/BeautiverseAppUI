import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import tw from '../../../tailwind';

const LoadingScreenLayout = ({style}) => {
  return (
    <View
      style={tw.style('flex-1 bg-white items-center justify-center', style)}>
      <ActivityIndicator color={'#5948AA'} />
    </View>
  );
};

export default LoadingScreenLayout;
