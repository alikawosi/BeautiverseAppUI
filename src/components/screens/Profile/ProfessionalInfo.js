import React from 'react';
import {View, Text, Image, Pressable, Platform, Linking} from 'react-native';
import {Shop, SmsEdit, Verify} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';
import {useLocation} from '../../../hooks';

const ProfessionalInfo = ({
  image,
  name,
  isMaestro,
  isVerify,
  rate,
  review,
  address,
  distance,
  longitude,
  latitude,
}) => {
  const {navigate} = useNavigation();
  const position = useLocation().location;

  const GetDirection = (long, lat) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        `http://maps.apple.com/?daddr=${lat},${long}&saddr=${position.coords.latitude},${position.coords.longitude}`,
      );
    }
    if (Platform.OS === 'android') {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${lat},${long}&travelmode=driving`,
      );
    }
  };
  return (
    <View style={tw`my-4`}>
      <View style={tw`flex-row`}>
        <View style={tw`w-3/12 items-start`}>
          <View
            style={tw`justify-center items-center border-2 border-dashed border-primary rounded-full p-1`}>
            <Image
              style={tw`w-15 h-15 rounded-full`}
              source={
                image
                  ? {uri: image}
                  : require('../../../assets/media/UserDefault.png')
              }
            />
          </View>
        </View>
        <View style={tw`w-9/12 justify-center`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`bv-heading-lg mr-1`}>{name}</Text>
              {isVerify ? (
                <Verify size={20} color="#5948AA" variant="Bold" />
              ) : null}
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            {isMaestro ? (
              <View style={tw`flex-row items-center`}>
                <Image
                  style={tw`w-4 h-5 mr-2`}
                  source={require('../../../assets/media/MaestroIcon.png')}
                />
                <Text style={tw`bv-sans-sm text-grayBorder`}>Maestro</Text>
                <Text style={tw`bv-sans-xs text-basicGray mx-1`}>{'|'}</Text>
              </View>
            ) : null}
            {/* <View style={tw`flex-row`}>
              <Image
                style={tw`w-4 h-4 mr-1`}
                source={require('../../../assets/media/Star1.png')}
              />
              <Text style={tw`bv-med-sm text-grayBorder`}>{rate}</Text>
              <Text style={tw`bv-sans-sm text-grayBorder mx-1`}>{'•'}</Text>
              <Text
                style={tw`bv-med-sm text-grayBorder`}>{`${review} Review`}</Text>
            </View> */}
          </View>
        </View>
      </View>
      <View style={tw`flex-row items-center mt-4  justify-between`}>
        <View style={tw`flex-row`}>
          <Pressable
            onPress={() => GetDirection(longitude, latitude)}
            style={tw`flex-row p-1 items-center`}>
            <Shop size={16} color="#5948AA" />
            <Text style={tw`bv-sans-sm text-primary ml-1 underline`}>
              {address}
            </Text>
          </Pressable>
          {distance ? (
            <View style={tw`flex-row`}>
              <Text style={tw`bv-sans-xs text-basicGray mx-1`}>{'|'}</Text>
              <Text style={tw`bv-heading-sm text-primary`}>{distance} km</Text>
            </View>
          ) : null}
        </View>
        {/* <Button
          onPress={() =>
            navigate('ChatScreens', {
              screen: 'ChatFAQ',
              params: {
                item: {
                  image,
                  name,
                  isMaestro,
                  isVerify,
                  responseTime: 'under 1',
                },
              },
            })
          }
          title={'Contact'}
          titleStyle={tw`underline`}
          defaultColor={'#5948AA'}
          icon={<SmsEdit size={16} color="#5948AA" />}
          style={tw`justify-center items-center h-auto p-1`}
        /> */}
      </View>
    </View>
  );
};

export {ProfessionalInfo};
