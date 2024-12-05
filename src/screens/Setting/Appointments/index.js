import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppointmentsMenu from './AppointmentsMenu';
import Appointments from './Appointments';
import Favorites from './Favorites';
import SavedAddress from './SavedAddress';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const AppointmentsSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="AppointmentsMenu"
        component={AppointmentsMenu}
        options={{title: 'Appointments'}}
      />
      <Stack.Screen
        name="Appointments"
        component={Appointments}
        options={{title: 'Upcoming'}}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Favorites'}}
      />
      <Stack.Screen
        name="SavedAddress"
        component={SavedAddress}
        options={{title: 'Your Address'}}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsSetting;
