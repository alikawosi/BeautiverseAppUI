import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {
  Verify,
  Shop,
  CloseCircle,
  Like,
  Like1,
  Woman,
  Man,
  Car,
  Heart,
} from 'iconsax-react-native';

import tw from '../../../tailwind';

const ProfessionalCard = ({
  name,
  isVerify,
  image,
  address,
  distance,
  isMaestro,
  isMobile,
  sex,
  isFavorite,
  //numberOfCustomer,
  satisfactionPercentage,
  // tabBarData,
  rtns,
  style,
  onClose,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw.style('w-auto rounded-20 bg-white  p-4', style)}>
      {onClose ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={tw`absolute z-20 p-2.5 right-0 top-0`}
          onPress={onClose}>
          <View>
            <CloseCircle color="#717171" />
          </View>
        </TouchableOpacity>
      ) : null}
      <View style={tw`flex-row `}>
        <View style={tw`w-1/5 mr-4`}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={
              typeof image === 'string'
                ? {
                    uri: image,
                  }
                : require('../../assets/media/UserDefault.png')
            }
          />
          {isMaestro ? (
            <View
              style={tw`rounded-10 bg-basicYellow w-12 px-1 py-0.5 items-center absolute top-9`}>
              <Text style={tw`bv-med-xs text-10`}>Maestro</Text>
            </View>
          ) : null}
        </View>
        <View style={tw`w-3/5 justify-around`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`bv-heading-base mr-1`}>{name ? name : null}</Text>
            {isVerify ? (
              <Verify size={16} color="#5948AA" variant="Bold" />
            ) : null}
          </View>
          <Text style={tw`bv-med-xs text-textGray`}>Stylist</Text>
          {address ? (
            <Text style={tw`bv-sans-xs text-primary ml-1 mb-4`}>
              {'at ' + address}
            </Text>
          ) : null}
          <View style={tw`flex-row  items-center`}>
            {distance && distance !== false ? (
              <>
                <Text style={tw`bv-sans-xs text-textGray ml-3`}>
                  {distance + ' Km'}
                </Text>
                <Text style={tw`bv-sans-xs text-lightGray mx-3`}>|</Text>
              </>
            ) : null}
            {isMobile ? (
              <>
                <Car size={16} color="#5948AA" />
              </>
            ) : null}
            {sex ? (
              <>
                <Text style={tw`bv-sans-xs text-lightGray mx-3`}>|</Text>
                <View style={tw`flex-row`}>
                  {sex === 'female' ? (
                    <Woman size={16} color="#5948AA" />
                  ) : sex === 'male' ? (
                    <Man size={16} color="#5948AA" />
                  ) : (
                    <>
                      <Woman size={16} color="#5948AA" />
                      <Man size={16} color="#5948AA" />
                    </>
                  )}
                </View>
              </>
            ) : null}
            {satisfactionPercentage ? (
              <>
                <Text style={tw`bv-sans-xs text-lightGray mx-3`}>|</Text>
                <View style={tw`flex-row`}>
                  <Like1 size={16} color="#5948AA" />
                  <Text
                    style={tw`bv-sans-sm text-primary ml-1`}>{`${satisfactionPercentage}%`}</Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
        <View style={tw`w-1/5`}>
          <Heart
            size="25"
            color={isFavorite ? 'red' : 'white'}
            variant={isFavorite ? 'Bold' : 'Linear'}
          />
        </View>
      </View>
      {/* <UnderLineTabBar data={ProfileReviewTabBarItem} /> */}
      {/* <ScrollView
        contentContainerStyle={tw`flex-row items-start mt-2`}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {numberOfCustomer || satisfactionPercentage ? (
          <CardTag style={tw`mr-2`}>
            {numberOfCustomer ? (
              <View style={tw`flex-row`}>
                <People size={16} color="#5948AA" />
                <Text style={tw`bv-sans-sm text-primary ml-1`}>
                  {`${numberOfCustomer}k Apps `}
                </Text>
              </View>
            ) : null}
            {satisfactionPercentage ? (
              <View style={tw`flex-row`}>
                <Like1 size={16} color="#5948AA" />
                <Text
                  style={tw`bv-sans-sm text-primary ml-1`}>{`${satisfactionPercentage}%`}</Text>
              </View>
            ) : null}
          </CardTag>
        ) : null}
        {sex ? (
          <CardTag style={tw`rounded-10 mr-1`}>
            {sex === 'female' ? (
              <Woman size={16} color="#5948AA" />
            ) : sex === 'male' ? (
              <Man size={16} color="#5948AA" />
            ) : (
              <>
                <Woman size={16} color="#5948AA" />
                <Man size={16} color="#5948AA" />
              </>
            )}

            <Text style={tw`bv-sans-xs text-primary ml-1 capitalize`}>
              {sex}
            </Text>
          </CardTag>
        ) : null}
        {isMobile ? (
          <CardTag style={tw`mr-2`}>
            <Car size={16} color="#5948AA" />
            <Text style={tw`bv-sans-sm text-primary ml-1`}>Mobile</Text>
          </CardTag>
        ) : null}
      </ScrollView> */}
    </Pressable>
  );
};

export {ProfessionalCard};
