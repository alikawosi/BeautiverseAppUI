import {View, Text, Linking} from 'react-native';
import React from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const SettingCard = ({
  icon,
  title,
  description,
  route,
  rootRoute,
  style,
  link,
}) => {
  const {navigate} = useNavigation();
  return (
    <Pressable
      onPress={() => {
        link
          ? Linking.openURL(link)
          : rootRoute
          ? navigate(rootRoute, {screen: route})
          : navigate({route});
      }}
      style={tw.style('flex-row justify-between w-full py-5 px-4  ', style)}>
      {icon}
      <View style={tw`ml-2.5 flex-1 `}>
        <Text style={tw`bv-heading-base`}>{title}</Text>
        {description ? <Text style={tw`bv-med-xs`}>{description}</Text> : null}
      </View>
      <ArrowRight2 color="#717171" size={22} />
    </Pressable>
  );
};

export {SettingCard};
