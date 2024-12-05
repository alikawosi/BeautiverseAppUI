import React from 'react';
import {View, Text, Pressable} from 'react-native';

import tw from '../../../../tailwind';

const SearchCard = ({
  title,
  icon,
  description,
  style,
  titleStyle,
  descriptionStyle,
  disabled,
  propsList,
  component,
  isActive,
  onPress = () => {},
}) => {
  return (
    <View>
      {isActive && component ? (
        React.createElement(component, propsList)
      ) : (
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={[
            tw.style(
              'shadow-md justify-between  bg-white flex-row w-full px-5 h-17 items-center rounded-3xl',
              style,
              {
                'opacity-90': disabled,
              },
            ),
          ]}>
          <View style={tw.style(' flex-row items-center justify-center')}>
            {icon}
            <Text style={[tw.style('bv-heading-sm ml-2 '), titleStyle]}>
              {title}
            </Text>
          </View>
          <Text
            style={[tw.style('bv-heading-sm text-primary'), descriptionStyle]}>
            {description}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
export {SearchCard};
