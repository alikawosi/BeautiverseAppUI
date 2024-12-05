import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountMenu from './AccountMenu';
import PersonalInformation from './PersonalInformation';
import LoginsAndSecurity from './LoginsAndSecurity';
import Notifications from './Notifications';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const AccountSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="AccountMenu"
        component={AccountMenu}
        options={{
          title: 'Account Settings',
        }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{title: 'Personal Info'}}
      />
      <Stack.Screen
        name="LoginsAndSecurity"
        component={LoginsAndSecurity}
        options={{title: 'Logins And Security'}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{title: 'Notifications'}}
      />
    </Stack.Navigator>
  );
};

export default AccountSetting;
