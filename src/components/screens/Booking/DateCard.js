import {View, Text, Pressable} from 'react-native';
import React from 'react';

import tw from '../../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';

const DateCard = ({
  day,
  dayNum,
  disabled = false,
  today,
  isSelected,
  onPress = () => {},
}) => {
  return (
    <Pressable
      style={tw.style('', {
        '  p-4 border-lightGray border rounded-20': !isSelected,
        'opacity-50 bg-lightGray border-0': disabled,
      })}
      disabled={disabled}
      onPress={onPress}>
      {isSelected ? (
        <LinearGradient
          useAngle={true}
          angle={198.2}
          colors={['#AB65F1', '#5E4BA5']}
          style={tw.style(' w-full rounded-20 p-4 z-10')}>
          <Text style={tw`bv-sans-base text-white shadow-md text-center mb-2`}>
            {day}
          </Text>
          <Text style={tw`bv-sans-base text-white text-center`}>{dayNum}</Text>
        </LinearGradient>
      ) : (
        <View
          style={tw.style({
            'border-primary border-b-2': today,
          })}>
          <Text style={tw`bv-sans-base text-primary text-center mb-2`}>
            {day}
          </Text>
          <Text style={tw`bv-sans-base text-primary text-center`}>
            {dayNum}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export {DateCard};
