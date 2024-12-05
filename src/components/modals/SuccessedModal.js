import {View, Text} from 'react-native';
import React from 'react';
import {TickCircle} from 'iconsax-react-native';

import {Button, ModalWrapper} from '../commons';
import tw from '../../../tailwind';
import {useNavigation} from '@react-navigation/native';

const SuccessedModal = ({route}) => {
  const {
    successedTitle,
    successedDescription,
    buttonText,
    request = false,
  } = route.params;
  const {reset, navigate} = useNavigation();
  return (
    <ModalWrapper style={tw`h-auto w-full py-3.5 px-5`} type="fromBottom">
      {request ? (
        <View style={tw`justify-center items-center mb-10`}>
          <TickCircle
            size={60}
            color={'#5948AA'}
            variant="Bold"
            style={tw`mb-2`}
          />
          <Text style={tw`bv-heading-lg text-primary mb-2`}>Requset Sent</Text>
          <Text style={tw`bv-sans-sm text-center`}>
            We will inform you if your request is accepted
          </Text>
        </View>
      ) : (
        <View style={tw`justify-center items-center mb-10`}>
          <TickCircle
            size={60}
            color={'#29CC39'}
            variant="Bold"
            style={tw`mb-2`}
          />
          <Text style={tw`bv-heading-lg text-[#29CC39] mb-2`}>
            {successedTitle}
          </Text>
          <Text style={tw`bv-sans-sm text-center`}>{successedDescription}</Text>
        </View>
      )}

      <Button
        primary
        title={buttonText}
        onPress={() => {
          navigate('TabBar', {screen: 'Appointment'});
          reset({
            routes: [{name: 'TabBar'}],
          });
        }}
      />
    </ModalWrapper>
  );
};

export {SuccessedModal};
