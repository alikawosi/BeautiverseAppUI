import React from 'react';
import {View, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../../tailwind';

const ServiceSubCard = ({
  offerTitle,
  newPrice,
  oldPrice,
  duration,
  onPress = () => {},
}) => {
  return (
    <Pressable
      style={tw`min-w-60 h-17 bg-background rounded-20 p-3 mt-1 justify-between`}
      onPress={onPress}>
      <>
        <View style={tw`w-11/12`}>
          <Text style={tw`bv-heading-sm`} numberOfLines={1}>
            {offerTitle ? offerTitle : null}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <View style={tw`flex flex-row`}>
            {newPrice ? (
              <Text style={tw`bv-med-sm text-black`}>{`$${newPrice}`}</Text>
            ) : null}
            {oldPrice ? (
              <Text
                style={tw.style('bv-med-sm text-black ml-2', {
                  'text-disable line-through': newPrice,
                })}>
                {`$${oldPrice}`}
              </Text>
            ) : null}
            {duration ? (
              <View style={tw`flex-row`}>
                <Text style={tw`bv-sans-xs text-grayBorder mx-2`}>{'|'}</Text>
                <Text style={tw`bv-med-sm`}>{`${duration}`}</Text>
              </View>
            ) : null}
          </View>
          {newPrice ? (
            <View style={tw`px-3 py-0.5  bg-[#222433] rounded-10`}>
              <Text style={tw`text-white bv-sans-xs`}>
                {`${(((oldPrice - newPrice) * 100) / oldPrice).toFixed()} %`}
              </Text>
            </View>
          ) : null}
        </View>
      </>
    </Pressable>
  );
};

export {ServiceSubCard};
