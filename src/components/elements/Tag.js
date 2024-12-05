import {Text, Pressable} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';

const Tag = ({title, value, selected, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw.style(
        'border  mx-1 border-grayBorder  border-opacity-50 rounded-10',
        style,
      )}>
      {selected ? (
        <LinearGradient
          useAngle={true}
          angle={198.2}
          colors={['#AB65F1', '#5E4BA5']}
          style={tw.style(' w-full rounded-10 px-3 py-2 z-10')}>
          <Text style={tw`bv-sans-sm text-white z-20`}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={tw`px-3 py-2 bv-sans-sm text-grayBorder `}>{title}</Text>
      )}
    </Pressable>
  );
};

export {Tag};
