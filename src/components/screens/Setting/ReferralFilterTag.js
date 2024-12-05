import {Text, Pressable} from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';

const ReferralFilterTag = ({title, activeFlag, style, onPress = () => {}}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw.style(
        'mr-2 p-2 border rounded-10 border-basicGray',
        {
          'bg-[#5948AA14] border-0': activeFlag,
        },
        style,
      )}>
      <Text
        style={tw.style('bv-sans-sm text-grayBorder', {
          'text-primary': activeFlag,
        })}>
        {title}
      </Text>
    </Pressable>
  );
};

export {ReferralFilterTag};
