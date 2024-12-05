import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Verification from './Verification';
import CameraVerification from './CameraVerification';
import {ScreenHeader} from '../../../../components/commons';

const Stack = createNativeStackNavigator();

const Identity = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          title: 'Identity Verification',
        }}
      />
      <Stack.Screen
        name="CameraVerification"
        component={CameraVerification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Identity;
