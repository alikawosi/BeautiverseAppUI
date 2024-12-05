import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingService from './BookingService';
import Checkout from './Checkout';

const Stack = createNativeStackNavigator();

const Booking = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookingService"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BookingService" component={BookingService} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default Booking;
