import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import tw from '../../../../tailwind';
import {CardTag} from '../../elements/CardTag';
import {
  Verify,
  Activity,
  Man,
  Woman,
  Car,
  Like1,
  Shop,
} from 'iconsax-react-native';

const MapSearchResultCard = ({
  name,
  isVerify,
  image,
  address,
  distance,
  category,
  isMobile,
  isUnisex,
  numberOfCustomer,
  satisfactionPercentage,
  style,
}) => {
  return (
    <View
      style={tw.style(
        'min-w-72 w-72 max-w-full rounded-20 bg-white shadow-lg p-3',
        style,
      )}>
      <View style={tw`flex-row `}>
        <View style={tw`w-3/12 items-center`}>
          <Image
            style={tw`w-20 h-20 rounded-15`}
            source={
              image ? image : require('../../../assets/media/UserDefault.png')
            }
          />
        </View>
        <View style={tw`w-9/12 justify-around pl-1`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-heading text-sm text-black mr-1`}>
              {name ? name : null}
            </Text>
            {isVerify ? <Verify size={14} color="#5948AA" /> : null}
            {category ? (
              <CardTag style={tw`absolute right-0`}>
                <Text style={tw`font-heading text-sm text-primary`}>
                  {category}
                </Text>
              </CardTag>
            ) : null}
          </View>
          {address || distance ? (
            <View style={tw`flex-row items-center mt-2 `}>
              {address ? (
                <View style={tw`flex-row  `}>
                  <Shop size={18} color="#5948AA" />
                  <Text style={tw`bv-sans-sm text-primary ml-1`}>
                    {address}
                  </Text>
                </View>
              ) : null}
              {distance ? (
                <View style={tw`flex-row`}>
                  <Text style={tw`bv-sans-sm text-gray-300 mx-1`}>{'|'}</Text>
                  <Text style={tw`bv-sans-sm text-primary`}>{distance} km</Text>
                </View>
              ) : null}
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={tw`flex-row items-start`}
            horizontal
            style={tw`mt-2`}
            showsHorizontalScrollIndicator={false}>
            {numberOfCustomer || satisfactionPercentage ? (
              <CardTag style={tw`mr-2`}>
                {numberOfCustomer ? (
                  <View style={tw`flex-row `}>
                    <Activity size={14} color="#5948AA" />
                    <Text style={tw`font-sans text-xs text-primary ml-1`}>
                      {`${numberOfCustomer}k Apps `}
                    </Text>
                  </View>
                ) : null}
                {satisfactionPercentage ? (
                  <View style={tw`flex-row`}>
                    <Like1 size={14} color="#5948AA" />
                    <Text
                      style={tw`font-sans text-xs text-primary ml-1`}>{`${satisfactionPercentage}%`}</Text>
                  </View>
                ) : null}
              </CardTag>
            ) : null}
            {isUnisex ? (
              <CardTag style={tw`mr-2`}>
                <Man size={14} color="#5948AA" />
                <Woman size={14} color="#5948AA" />
                <Text style={tw`font-sans text-xs text-primary ml-1`}>
                  {isUnisex}
                </Text>
              </CardTag>
            ) : null}
            {isMobile ? (
              <CardTag style={tw`mr-2`}>
                <Car size={14} color="#5948AA" />
                <Text style={tw`font-sans text-xs text-primary ml-1`}>
                  Mobile
                </Text>
              </CardTag>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export {MapSearchResultCard};
