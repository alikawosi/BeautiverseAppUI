import React from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';

import tw from '../../../tailwind';
import {
  Verify,
  People,
  Man,
  Woman,
  Car,
  Like1,
  Shop,
} from 'iconsax-react-native';
import {CardTag, OfferSubCard} from '.';

const OfferCard = ({
  mainImage,
  name,
  isVerify,
  isMaestro,
  image,
  address,
  distance,
  isMobile,
  sex,
  numberOfCustomer,
  satisfactionPercentage,
  offerTitle,
  newPrice,
  oldPrice,
  duration,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={tw`w-65 rounded-20 bg-white shadow-lg`}>
      <Image
        style={tw`w-full h-32 rounded-t-20`}
        source={
          mainImage ? mainImage : require('../../assets/media/OfferImage.png')
        }
      />
      <View style={tw`p-2`}>
        <View style={tw`flex-row mb-2`}>
          <View style={tw`w-3/12`}>
            <Image
              style={tw`w-12 h-12 rounded-15`}
              source={
                image
                  ? {uri: image}
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
          <View style={tw`w-9/12 justify-around`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`bv-heading-base mr-1`}>
                {name ? name : 'unknown'}
              </Text>
              {isVerify ? (
                <Verify size={16} color="#5948AA" variant="Bold" />
              ) : null}
            </View>
            {address || distance ? (
              <View style={tw`flex-row items-center`}>
                {address ? (
                  <View style={tw`flex-row`}>
                    <Shop size={14} color="#5948AA" />
                    <Text style={tw`bv-sans-xs text-primary ml-1`}>
                      {address}
                    </Text>
                  </View>
                ) : null}
                {distance ? (
                  <View style={tw`flex-row`}>
                    <Text style={tw`bv-sans-xs text-gray-300 mx-1`}>{'|'}</Text>
                    <Text style={tw`bv-med-xs text-primary`}>
                      {distance} km
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={tw`flex-row items-start mt-2`}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {numberOfCustomer || satisfactionPercentage ? (
            <CardTag style={tw`rounded-10 h-6 mr-1`}>
              {numberOfCustomer ? (
                <View style={tw`flex-row`}>
                  <People size={16} color="#5948AA" />
                  <Text style={tw`bv-sans-xs text-primary ml-1`}>
                    {`${numberOfCustomer}k Apps `}
                  </Text>
                </View>
              ) : null}
              {satisfactionPercentage ? (
                <View style={tw`flex-row`}>
                  <Like1 size={16} color="#5948AA" />
                  <Text
                    style={tw`bv-sans-xs text-primary ml-1`}>{`${satisfactionPercentage}%`}</Text>
                </View>
              ) : null}
            </CardTag>
          ) : null}
          {sex ? (
            <CardTag style={tw`rounded-10 h-6 mr-1`}>
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
          {isMobile === 'mobile' ? (
            <CardTag style={tw`rounded-10 h-6 mr-1`}>
              <Car size={16} color="#5948AA" />
              <Text style={tw`bv-sans-xs text-primary ml-1`}>Mobile</Text>
            </CardTag>
          ) : null}
        </ScrollView>
        <View style={tw`bg-black bg-opacity-10 h-px w-full my-2`} />
        <OfferSubCard
          offerTitle={offerTitle}
          offPercentage={Math.round(((oldPrice - newPrice) * 100) / oldPrice)}
          newPrice={newPrice}
          oldPrice={oldPrice}
          duration={duration}
        />
      </View>
    </Pressable>
  );
};

export {OfferCard};
