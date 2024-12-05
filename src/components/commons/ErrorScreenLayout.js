import {View, Text, Image} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';

const ErrorScreenLayout = ({description, style}) => {
  return (
    <View style={tw.style('justify-center items-center bg-white ', style)}>
      {/* <Image
        style={tw`w-48 h-48`}
        source={require('../../assets/media/EmptyScreen.png')}
      /> */}
      <Text style={tw`bv-heading-lg text-center capitalize`}>
        {description}
      </Text>
    </View>
  );
};

export {ErrorScreenLayout};
