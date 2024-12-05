import React from 'react';
import {View, Pressable, TextInput} from 'react-native';
import {SearchNormal} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const SearchBar = ({textStyle, style}) => {
  return (
    <View style={tw`w-full mb-7`}>
      <Pressable
        style={tw.style(
          'flex-row items-center border rounded-20 h-12 px-4 border-basicGray bg-white',
          style,
        )}>
        <SearchNormal size={24} color="#414141" />
        <TextInput
          style={tw`bv-sans-sm ml-3 h-6`}
          placeholder="Search Messages"
          underlineColorAndroid={'rgba(0,0,0,0)'}
          autoCorrect={false}
        />
      </Pressable>
    </View>
  );
};

export {SearchBar};
