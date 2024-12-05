import React from 'react';
import {View, Text, Image} from 'react-native';

import tw from '../../../../tailwind';
import {Verify} from 'iconsax-react-native';

const ChatCard = ({image, name, desc, time, isVerify, isOnline, unread}) => {
  return (
    <View style={tw`h-12 w-full`}>
      <View style={tw`flex-row`}>
        <View style={tw`w-2/12`}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={
              image ? image : require('../../../assets/media/UserDefault.png')
            }
          />
          {isOnline ? (
            <View
              style={tw`w-3 h-3 bg-basicGreen rounded-full border-2  border-white absolute bottom-0 right-2`}
            />
          ) : null}
        </View>
        <View style={tw`w-10/12 justify-center items-start`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-row items-center flex-1`}>
              <Text style={tw`bv-heading-base mr-1`}>
                {name ? name : 'unknown'}
              </Text>
              {isVerify ? (
                <Verify size={16} color="#008FD6" variant="Bold" />
              ) : null}
            </View>
            <Text style={tw`bv-sans-xs`}>{time}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text numberOfLines={1} style={tw`bv-med-sm flex-1`}>
              {desc}
            </Text>
            {unread ? (
              <View
                style={tw`h-6 w-6 justify-center items-center bg-primary rounded-full`}>
                <Text style={tw`bv-sans-xs text-white`}>{unread}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export {ChatCard};
