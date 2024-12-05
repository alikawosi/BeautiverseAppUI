import {View, Text, Image} from 'react-native';
import React from 'react';
import {Location, Notepad2, Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const SearchResultCard = ({
  id,
  image,
  title,
  style,
  beauticianFlag,
  serviceFlag,
  isVerified,
  location,
  rate,
  distance,
  isMobile,
  onPress = () => false,
}) => {
  return (
    <View key={id} style={tw.style('', style)}>
      {beauticianFlag ? (
        <>
          <Pressable
            onPress={onPress}
            style={tw`flex-row items-center w-full `}>
            <Image
              source={
                typeof image.url === 'string'
                  ? {
                      uri: image.url,
                    }
                  : require('../../../assets/media/UserDefault.png')
              }
              style={tw`rounded-full w-14  h-14  `}
            />
            <View style={tw`ml-4`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`bv-heading-lg mr-0.5`}>{title}</Text>
                {isVerified ? (
                  <Verify size={20} color="#5948AA" variant="Bold" />
                ) : null}
              </View>
              <Text style={tw`bv-med-sm `}>Stylist</Text>
              <Text style={tw`bv-med-sm text-primary `}>
                {'at ' + location}
              </Text>
            </View>
          </Pressable>
          {/*
          <View>
              rate,isMobile and distance Tags.
          <View /> */}
        </>
      ) : (
        <Pressable
          onPress={() => {
            onPress({id: id, title: title});
          }}
          style={tw`flex-row items-center `}>
          <View
            style={tw.style('bg-lightGray p-2 rounded-15', {
              'bg-primary': serviceFlag,
            })}>
            {serviceFlag ? (
              <Notepad2 size="26" color="#FFFFFF" variant="Outline" />
            ) : (
              <Location size="26" color="#7A7A8A" variant="Outline" />
            )}
          </View>
          <Text style={tw`bv-med-sm ml-3 flex-1`}>{title}</Text>
        </Pressable>
      )}
    </View>
  );
};

export {SearchResultCard};
