import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../tailwind';

const OfferSubCard = ({
  offerTitle,
  offPercentage,
  newPrice,
  oldPrice,
  duration,
  style,
}) => {
  return (
    <View
      style={tw.style('w-full  rounded-15 p-3 h-18 justify-between', style)}>
      <View style={tw`w-10/12`}>
        <Text style={tw`bv-heading-sm`} numberOfLines={1}>
          {offerTitle ? offerTitle : null}
        </Text>
      </View>
      <View style={tw`flex-row items-center`}>
        {newPrice ? <Text style={tw`bv-med-sm`}>{`$${newPrice}`}</Text> : null}
        {oldPrice ? (
          <Text style={tw`bv-med-sm text-disable line-through ml-2`}>
            {`$${oldPrice}`}
          </Text>
        ) : null}
        {duration ? (
          <View style={tw`flex-row`}>
            <Text style={tw`mx-2 text-grayBorder`}>{'|'}</Text>
            <Text style={tw`bv-med-sm`}>{`${duration} min`}</Text>
          </View>
        ) : null}
        {offPercentage ? (
          <View style={tw`px-2 py-0.5 ml-2 bg-[#222433] rounded-[8px]`}>
            <Text
              style={tw`bv-med-xs text-white text-center`}>{`${offPercentage}%`}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export {OfferSubCard};
