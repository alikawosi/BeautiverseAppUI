import {Shop, Verify} from 'iconsax-react-native';
import React from 'react';
import {View, Text, Image} from 'react-native';

import tw from '../../../../tailwind';

const ProfessionalProfileSummary = ({img, title, verified, address, style}) => {
  return (
    <View style={tw.style('flex-row flex-1 items-center', style)}>
      <Image
        style={tw`rounded-full w-18 h-18 mb-3 mr-4`}
        source={
          img ? {uri: img} : require('../../../assets/media/UserDefault.png')
        }
      />
      <View>
        <View style={tw`flex-row mb-1 items-center`}>
          <Text style={tw`bv-sans-lg capitalize mr-1`}>{title}</Text>
          {verified ? (
            <Verify size={18} color={'#5948AA'} variant="Bold" />
          ) : null}
        </View>
        <View style={tw`flex-row mb-3 items-center`}>
          <Shop size={16} color={'#5948AA'} style={tw`mr-1`} />
          <Text style={tw`bv-sans-sm  capitalize text-primary`}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export {ProfessionalProfileSummary};
