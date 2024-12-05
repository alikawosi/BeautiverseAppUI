import React from 'react';
import {View, Text, Image} from 'react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const NotificationCard = ({image, icon, title, desc, time, hasAction}) => {
  return (
    <View style={tw`w-full`}>
      <View style={tw`flex-row`}>
        <View style={tw`w-2/12`}>
          {hasAction ? (
            <View style={tw`justify-center items-center`}>{icon}</View>
          ) : (
            <Image
              style={tw`w-12 h-12 rounded-full`}
              source={
                image ? image : require('../../../assets/media/UserDefault.png')
              }
            />
          )}
        </View>
        <View style={tw`w-10/12 items-start`}>
          <Text style={tw`bv-heading-base`}>
            {title}
            <Text style={tw`bv-med-sm`}>{` ${desc}`}</Text>
            <Text style={tw`bv-sans-xs`}>{` ${time}`}</Text>
          </Text>
        </View>
      </View>
      {hasAction ? (
        <Button
          title={'Action'}
          style={tw`h-8`}
          titleStyle={tw`bv-heading-sm`}
          defaultColor="#5948AA"
        />
      ) : null}
    </View>
  );
};

export {NotificationCard};
