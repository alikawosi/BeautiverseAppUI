import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppointmentsSetting from './Appointments';
import PaymentsSetting from './Payments';
import WalletSetting from './Wallet';
import AccountSetting from './Account';
import Support from './Support';
import Legal from './Legal';
import SettingIntro from './SettingIntro';
import Feedback from './Feedback';
import BecomeABeautiversePro from './BecomeABeautiversePro';
import UserProfileSetting from './UserProfile';

const Stack = createNativeStackNavigator();

const Setting = () => {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingIntro" component={SettingIntro} />
      <Stack.Screen
        name="AppointmentsSetting"
        component={AppointmentsSetting}
      />
      <Stack.Screen name="PaymentsSetting" component={PaymentsSetting} />
      <Stack.Screen name="WalletSetting" component={WalletSetting} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen
        name="BecomeABeautiversePro"
        component={BecomeABeautiversePro}
      />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
};

export default Setting;
