import React from 'react';
import {Text, Image, Pressable, View} from 'react-native';

import tw from '../../../tailwind';

const CategoryCard = ({title, image, onPress, isChecked = false}) => {
  const categoryImage = {uri: image};
  return (
    <View style={tw`items-center w-24 h-32 mb-2`}>
      <Pressable onPress={onPress} style={tw` justify-center  items-center`}>
        <Image
          style={tw.style('w-24 h-24 rounded-15', {
            'border-2 border-primary': isChecked,
          })}
          source={
            image
              ? categoryImage
              : require('../../assets/media/UserDefault.png')
          }
        />
      </Pressable>
      <Text
        style={tw.style(
          'bv-sans-sm text-lightBlack text-center self-center mt-3',
          {
            'bv-sans-sm text-primary': isChecked,
          },
        )}
        numberOfLines={2}
        ellipsizeMode={'clip'}>
        {title}
      </Text>
    </View>
  );
};

export {CategoryCard};
