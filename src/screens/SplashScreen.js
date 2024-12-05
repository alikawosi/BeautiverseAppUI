import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';

import tw from '../../tailwind';

const SplashScreen = () => {
  return (
    <View style={tw`bg-white flex-1 items-center justify-center`}>
      <Image
        style={tw`w-33 h-33 mb-6`}
        source={require('../assets/media/logo.png')}
      />
      <ActivityIndicator color={'#5948AA'} size={35} />
    </View>
  );
};

export default SplashScreen;
