import React from 'react';
import {View} from 'react-native';

import tw from '../../../tailwind';

const CardTag = ({children, style}) => {
  return (
    <View
      style={tw.style(
        'rounded-lg h-8 flex-row items-center justify-center px-2 bg-primary bg-opacity-10',
        style,
      )}>
      {children}
    </View>
  );
};

export {CardTag};
