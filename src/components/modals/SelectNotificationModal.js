import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, ModalWrapper, Switch} from '../commons';

const SelectNotificationModal = ({route}) => {
  const {onSubmit = () => {}} = route.params;
  const [pushNotification, setPushNotification] = useState(false);
  const [smsNotification, setSMSNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const {navigate, reset} = useNavigation();

  return (
    <ModalWrapper
      titleSeparator
      title="Notification"
      type="fromBottom"
      style={tw.style('w-full h-auto bg-white rounded-[30px] px-5')}>
      <View style={tw.style(' justify-between flex-row mb-6 ')}>
        <Text>Push</Text>
        <Switch
          onPress={() => setPushNotification(!pushNotification)}
          isActive={pushNotification}
        />
      </View>
      <View style={tw.style(' justify-between flex-row mb-6')}>
        <Text>SMS</Text>
        <Switch
          onPress={() => setSMSNotification(!smsNotification)}
          isActive={smsNotification}
        />
      </View>
      <View style={tw.style(' justify-between flex-row mb-6')}>
        <Text>Email</Text>
        <Switch
          onPress={() => setEmailNotification(!emailNotification)}
          isActive={emailNotification}
        />
      </View>
      <Button
        title={'Save'}
        primary
        onPress={() => {
          let a = {
            Push: pushNotification,
            SMS: smsNotification,
            Email: emailNotification,
          };
          onSubmit(a);
          navigate('Notifications');
          reset;
        }}
      />
    </ModalWrapper>
  );
};

export {SelectNotificationModal};
