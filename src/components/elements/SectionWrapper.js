import {View, Text, Pressable} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';

const SectionWrapper = ({
  title,
  description,
  children,
  style,
  disabled,
  contentStyle,
  titleStyle,
  descriptionStyle,
  seperator = true,
  onDescriptionPress = () => {},
}) => {
  return (
    <View
      style={tw.style(
        {'opacity-50': disabled, 'border-b-basicGray border-b': seperator},
        style,
      )}>
      <View style={tw`justify-between w-full flex-row items-center mb-4`}>
        <Text style={tw.style('bv-heading-base capitalize ', titleStyle)}>
          {title}
        </Text>
        <Pressable
          style={tw`p-2 `}
          onPress={onDescriptionPress}
          disabled={disabled}>
          <Text style={tw.style('bv-reg-sm ', descriptionStyle)}>
            {description}
          </Text>
        </Pressable>
      </View>
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

export {SectionWrapper};
