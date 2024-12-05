import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentScreen from './AppointmentScreen';
import Subscriptions from './Subscriptions';
import {BackButton, ScreenHeader} from '../../components/commons';
import Appointments from '../Setting/Appointments/Appointments';
import Favorites from '../Setting/Appointments/Favorites';

const Stack = createNativeStackNavigator();

const Appointment = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppointmentScreen"
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{title: 'Subscriptions'}}
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
    </Stack.Navigator>
  );
};

export default Appointment;
