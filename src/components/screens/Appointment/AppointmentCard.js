import React from 'react';
import {View, Text, Image} from 'react-native';
import {Calendar2, Clock, More, Shop, Verify} from 'iconsax-react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import tw from '../../../../tailwind';
import {OfferSubCard} from '../../elements';
import {useNavigation} from '@react-navigation/native';

const AppointmentCard = ({
  name,
  isVerify,
  isMaestro,
  image,
  address,
  distance,
  time,
  date,
  dueDate,
  offerTitle,
  offPercentage,
  newPrice,
  oldPrice,
  duration,
  style,
  isUpcoming,
}) => {
  const {navigate, goBack, reset} = useNavigation();
  return (
    <View style={tw.style('w-72 rounded-15 bg-white p-4', style)}>
      <View style={tw`flex-row`}>
        <View style={tw`w-3/12`}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={
              image
                ? {uri: image}
                : require('../../../assets/media/UserDefault.png')
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
            {/* <Menu style={tw``}>
              <MenuTrigger>
                <More color="#717171" size={18} />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={tw`bg-white p-2 w-43 rounded-lg`}>
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
                  style={tw` p-2 `}>
                  <Text style={tw`bv-reg-sm font-bold`}>Message</Text>
                </MenuOption>
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
                  style={tw` p-2 `}>
                  <Text style={tw`bv-reg-sm font-bold`}>Reschedule</Text>
                </MenuOption>
                {isUpcoming ? (
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
                    }
                    style={tw` p-2 `}>
                    <Text style={tw`bv-reg-sm text-textRed font-bold`}>
                      Cancel Appointment
                    </Text>
                  </MenuOption>
                ) : null}
              </MenuOptions>
            </Menu> */}
          </View>
          {address || distance ? (
            <View style={tw`flex-row items-center`}>
              {address ? (
                <View style={tw`flex-row`}>
                  <Shop size={14} color="#313244" />
                  <Text style={tw`bv-sans-xs text-textGray ml-1`}>
                    {address}
                  </Text>
                </View>
              ) : null}
              {distance ? (
                <View style={tw`flex-row`}>
                  <Text style={tw`bv-sans-xs text-gray-300 mx-1`}>{'|'}</Text>
                  <Text style={tw`bv-sans-xs text-textGray`}>
                    {distance} km
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
      <View style={tw`flex-row items-center my-4 justify-between`}>
        <View style={tw`flex-row`}>
          <View style={tw`flex-row items-center`}>
            <Clock size={14} color="#414141" />
            {!isUpcoming ? (
              <Text style={tw`bv-med-xs text-grayBorder ml-1`}>
                Last Visit:
              </Text>
            ) : null}
            <Text style={tw`bv-sans-xs ml-1`}>{time}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={tw`bv-sans-xs mx-1`}>{'|'}</Text>
            <Text style={tw`bv-sans-xs`}>{date}</Text>
          </View>
        </View>
        {isUpcoming ? (
          <View style={tw`flex-row items-center`}>
            <Calendar2 size={14} color="#414141" />
            <Text style={tw`bv-sans-xs ml-1`}>{dueDate}</Text>
          </View>
        ) : null}
      </View>
      <OfferSubCard
        style={tw`bg-background`}
        offerTitle={offerTitle}
        offPercentage={offPercentage}
        newPrice={newPrice}
        oldPrice={oldPrice}
        duration={duration}
      />
    </View>
  );
};

export {AppointmentCard};
