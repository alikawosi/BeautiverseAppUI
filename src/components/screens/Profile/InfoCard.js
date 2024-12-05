import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';

const InfoCard = ({data, desc}) => {
  const {navigate} = useNavigation();

  const Item = props => {
    const {title, icon, moreWidth} = props;
    return (
      <View
        style={tw.style('flex-row items-center w-[40%] py-1', {
          'w-[60%]': moreWidth,
        })}>
        {icon ? icon : null}
        <Text style={tw`ml-2 mr-1`}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#f1f1f1] w-full h-auto rounded-20 p-4 mb-5`}>
      <View style={tw`flex-row flex-wrap content-between`}>
        {data?.map((item, n) => (
          <Item
            key={item.id}
            moreWidth={n % 2 === 0}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </View>
      <View style={tw`border-t border-basicGray my-3`} />
      <View style={tw`flex-row`}>
        <Text style={tw`bv-sans-xs `} numberOfLines={2}>
          {desc} +{' '}
        </Text>
        <Pressable
          style={tw`bg-[#f1f1f1] absolute right-0 bottom-0`}
          onPress={() => navigate('AboutMe', {data, desc})}>
          <Text style={tw`bv-sans-xs  text-primary `}>... See more</Text>
        </Pressable>
      </View>
    </View>
  );
};

export {InfoCard};
