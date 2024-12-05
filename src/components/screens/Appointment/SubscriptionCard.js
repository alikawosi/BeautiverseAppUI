import React from 'react';
import {View, Text, Image} from 'react-native';
import {More, Shop, Verify} from 'iconsax-react-native';
import * as Progress from 'react-native-progress';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {CardTag} from '../../elements';
import {Button} from '../../commons';

const SubscriptionCard = ({
  name,
  isVerify,
  isMaestro,
  image,
  address,
  distance,
  category,
  availableCredit,
  nextPayment,
  progress,
  sessionsPassed,
  style,
}) => {
  const {navigate} = useNavigation();
  return (
    <View style={tw.style('w-72 rounded-15 bg-white shadow-lg p-4', style)}>
      <View style={tw`flex-row`}>
        <View style={tw`w-3/12`}>
          <Image
            style={tw`w-12 h-12 rounded-15`}
            source={
              image ? image : require('../../../assets/media/UserDefault.png')
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
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`bv-heading-base mr-1`}>
                {name ? name : 'unknown'}
              </Text>
              {isVerify ? (
                <Verify size={14} color="#5948AA" variant="Bold" />
              ) : null}
            </View>
            <Menu style={tw``}>
              <MenuTrigger
                onSelect={value => alert(`Selected number: ${value}`)}>
                <More color="#717171" />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={tw`w-40 rounded-lg`}>
                <MenuOption
                  onSelect={() =>
                    navigate('ChatScreens', {
                      screen: 'ChatFAQ',
                      params: {
                        item: {
                          name: name,
                          responseTime: 'under 1',
                          isVerify: true,
                          isOnline: true,
                        },
                      },
                    })
                  }
                  text="Message"
                />
                <MenuOption
                  onSelect={() =>
                    navigate('InfoModal', {
                      title: 'Cancellation Policy',
                      submitButtonTitle: 'Reschedule',
                      cancelButtonTitle: 'Contact',
                      onSubmit: () => {
                        //goBack();
                      },
                      onCancel: () => {
                        //reset();
                      },
                      desc1: (
                        <Text
                          style={tw`bv-sans-base text-grayBorder mb-6 text-center`}>
                          Cancellation Policy may apply, please contact the
                          service provider for more information
                        </Text>
                      ),
                    })
                  }
                  text="Reschedule"
                />
                <MenuOption
                  onSelect={() =>
                    navigate('InfoModal', {
                      title: 'Cancellation Policy',
                      submitButtonTitle: 'Cancel',
                      cancelButtonTitle: 'Contact',
                      onSubmit: () => {
                        //goBack();
                      },
                      onCancel: () => {
                        //goBack();
                      },
                      desc1: (
                        <Text
                          style={tw`bv-sans-base text-grayBorder mb-6 text-center`}>
                          Cancellation Policy may apply, please contact the
                          service provider for more information
                        </Text>
                      ),
                      desc2: (
                        <Text
                          style={tw`bv-sans-base text-grayBorder mb-6 text-center`}>
                          Please contact the service provider for more
                          information.
                        </Text>
                      ),
                    })
                  }>
                  <Text style={tw`text-[#FF614C]`}>Cancel Appointment</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
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
                  <Text style={tw`bv-sans-xs text-primary`}>{distance} km</Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
      <View style={tw`flex-row items-center mt-5 justify-between`}>
        <Text style={tw`bv-med-sm text-grayBorder`}>Category:</Text>
        <CardTag style={tw`h-6 rounded-xl`}>
          <Text style={tw`bv-sans-base text-primary`}>{category}</Text>
        </CardTag>
      </View>
      <View style={tw`flex-row items-center mt-4 justify-between`}>
        <Text style={tw`bv-med-sm text-grayBorder`}>Available Credit:</Text>
        <Text style={tw`bv-sans-sm`}>{availableCredit}</Text>
      </View>
      <View style={tw`flex-row items-center mt-4 justify-between`}>
        <Text style={tw`bv-med-sm text-grayBorder`}>Next Payment:</Text>
        <Text style={tw`bv-sans-sm`}>{nextPayment}</Text>
      </View>
      <View style={tw`flex-row justify-between items-center mt-4`}>
        <Text style={tw`bv-sans-xs`}>{`${progress}%`}</Text>
        <View style={tw`flex-1 px-2`}>
          <Progress.Bar
            color="#5948AA"
            unfilledColor="rgba(89, 72, 170,0.1)"
            borderWidth={0}
            progress={progress / 100}
            width={null}
            borderRadius={47}
          />
        </View>
        <Text style={tw`bv-sans-xs text-grayBorder`}>{sessionsPassed}</Text>
      </View>
      <Button
        primary
        title={'Book Now'}
        containerStyle={tw`mt-6`}
        style={tw`h-8`}
        gradientStyle={tw`rounded-lg`}
        titleStyle={tw`text-sm`}
        onPress={() =>
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {
              item: {
                name,
                isVerify,
                isMaestro,
                image,
                address,
                distance,
                category,
              },
            },
          })
        }
      />
    </View>
  );
};

export {SubscriptionCard};
