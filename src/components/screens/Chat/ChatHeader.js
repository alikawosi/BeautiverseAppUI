import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2, Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const ChatHeader = ({image, name, responseTime, isVerify, isOnline}) => {
  const {goBack, navigate} = useNavigation();

  return (
    <View style={tw.style('flex-row pb-2.5 px-5 mt-4')}>
      <Pressable onPress={goBack} style={tw`w-2/12 justify-center pl-2`}>
        <ArrowLeft2 size={24} color="#717171" />
      </Pressable>
      <Pressable
        onPress={() =>
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {item: {image, name, responseTime, isVerify, isOnline}},
          })
        }
        style={tw`flex-row w-10/12`}>
        <View style={tw`w-1/5`}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={
              image
                ? {uri: image}
                : require('../../../assets/media/UserDefault.png')
            }
          />
          {isOnline ? (
            <View
              style={tw`w-3 h-3 bg-basicGreen rounded-full border-2  border-white absolute bottom-0 right-2`}
            />
          ) : null}
        </View>
        <View style={tw`w-4/5 justify-center items-start`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-row items-center flex-1`}>
              <Text style={tw`bv-heading-base mr-1`}>
                {name ? name : 'unknown'}
              </Text>
              {isVerify ? (
                <Verify size={16} color="#008FD6" variant="Bold" />
              ) : null}
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text numberOfLines={1} style={tw`bv-sans-sm flex-1`}>
              response time:
              <Text
                style={tw`bv-sans-sm text-primary`}>{` ${responseTime}`}</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export {ChatHeader};
