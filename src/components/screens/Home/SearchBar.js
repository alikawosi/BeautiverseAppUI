import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchNormal} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const SearchBar = ({textStyle, style, containerStyle}) => {
  const {navigate} = useNavigation();

  return (
    <View style={tw.style('w-full pt-6 px-5 pb-4', containerStyle)}>
      <Pressable
        onPress={() => {
          navigate('Search', {
            screen: 'ServiceSearch',
          });
        }}
        style={tw.style(
          'flex-row shadow-lg shadow-gray-600 items-center rounded-24 h-14 px-6  bg-white',
          style,
        )}>
        <SearchNormal size={24} color="#5948AA" style={tw`mr-2.5`} />
        <Text style={tw.style('bv-med-base text-textGray', textStyle)}>
          Search for Services or Professional
        </Text>
      </Pressable>
    </View>
  );
};

export {SearchBar};
