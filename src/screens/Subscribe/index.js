import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ServiceSubscribe from './ServiceSubscribe';

const Stack = createNativeStackNavigator();

const Subscribe = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceSubscribe" component={ServiceSubscribe} />
    </Stack.Navigator>
  );
};

export default Subscribe;
