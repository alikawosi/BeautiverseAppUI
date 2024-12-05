import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const UserProfileCard = ({
  name,
  isVerified,
  isShowed,
  joinedDate,
  style,
  avatar,
}) => {
  const {navigate} = useNavigation();

  return (
    <View style={tw.style('flex-row items-start', style)}>
      <View style={tw`items-center mr-4`}>
        <Image source={{uri: avatar}} style={tw`rounded-full w-18 h-18 `} />
        {isShowed ? <Text style={tw`bv-med-xs `}>{joinedDate}</Text> : null}
      </View>

      <View style={tw`items-start my-2`}>
        <View style={tw`flex-row mb-1 items-center`}>
          <Text style={tw`mr-1 bv-heading-lg `}>{name}</Text>
          {isVerified ? (
            <Verify size={20} color="#5948AA" variant="Bold" />
          ) : null}
        </View>
        {!isShowed ? (
          <Pressable onPress={() => navigate('UserProfileSetting')}>
            <Text style={tw`bv-sans-sm text-primary `}>Show Profile</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigate('EditUserProfile')}>
            <Text style={tw`bv-sans-sm text-primary `}>Edit Profile</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export {UserProfileCard};
