import React from 'react';
import {View, Text, ImageBackground, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../tailwind';
import {Verify, People, Like1} from 'iconsax-react-native';

const ProfessionalImageCard = ({
  name,
  isVerify,
  image,
  address,
  distance,
  category,
  numberOfCustomer,
  satisfactionPercentage,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={tw`rounded-15`}>
      <Image
        style={tw`w-40 h-56 justify-center items-center rounded-15`}
        resizeMode="cover"
        source={
          typeof image === 'string'
            ? {
                uri: image,
              }
            : require('../../assets/media/TestBgImage.png')
        }
      />
      <LinearGradient
        colors={['#ffffff', '#271F1F']}
        style={tw`absolute top-0 left-0 right-0 bottom-0 justify-between items-center w-full h-full rounded-15 opacity-30`}
      />
      <View
        style={tw`absolute top-0 left-0 right-0 bottom-0 rounded-15 items-start px-3 pt-3 pb-4`}>
        {category ? (
          <View style={tw`px-4 py-1 bg-[#22243357] rounded-10`}>
            <Text style={tw`text-white text-sm font-heading`}>{category}</Text>
          </View>
        ) : null}
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`flex-row mb-1 items-center`}>
            <Text style={tw`font-heading text-base text-white mr-1`}>
              {name ? name : 'unknown'}
            </Text>
            {isVerify ? (
              <Verify size={14} color="white" variant="Bold" />
            ) : null}
          </View>
          {numberOfCustomer || satisfactionPercentage ? (
            <View style={tw`flex-row px-1 py-1 border-white border rounded-lg`}>
              {numberOfCustomer ? (
                <View style={tw`flex-row`}>
                  <People size={14} color="white" variant="Bold" />
                  <Text style={tw`font-sans text-xs text-white mx-1`}>
                    {`${numberOfCustomer}k Apps `}
                  </Text>
                </View>
              ) : null}
              {satisfactionPercentage ? (
                <View style={tw`flex-row`}>
                  <Like1 size={14} color="white" variant="Bold" />
                  <Text
                    style={tw`font-sans text-xs text-white ml-1`}>{`${satisfactionPercentage}%`}</Text>
                </View>
              ) : null}
            </View>
          ) : null}
          {address || distance ? (
            <Text style={tw`font-med text-xs text-white pt-1`}>
              {address ? `${address} ` : null}
              <Text style={tw`font-med text-xs text-white pt-1 underline`}>
                {distance ? `,(${distance} Km)` : null}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export {ProfessionalImageCard};
