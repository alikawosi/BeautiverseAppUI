import {View, Text, Image} from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';

const ReferralUserCard = ({title, date, point, style}) => {
  return (
    <View style={tw.style('flex-row w-full ', style)}>
      <Image
        source={require('../../../assets/media/ReferralUserImage.png')}
        style={tw`w-12 h-12 rounded-15 mr-3`}
      />
      <View style={tw`flex flex-1`}>
        <Text style={tw`bv-heading-base mb-1`}>{title}</Text>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`bv-sans-xs text-grayBorder`}>{date}</Text>
          <Text style={tw`bv-sans-xs text-primary`}>{point}</Text>
        </View>
      </View>
    </View>
  );
};

export {ReferralUserCard};
