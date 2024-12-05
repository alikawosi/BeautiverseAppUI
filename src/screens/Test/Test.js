import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';

const Test = () => {
  return (
    <View style={tw`flex-1 justify-center`}>
      <Text>Hello</Text>
    </View>
  );
};

export default Test;
