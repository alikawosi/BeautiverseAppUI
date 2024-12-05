import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BackButton, ScreenHeader} from '../../components/commons';
import ProfessionalProfile from './ProfessionalProfile';
import Portfolio from './Portfolio';

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="ProfessionalProfile"
        component={ProfessionalProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{title: 'Portfolio'}}
      />
    </Stack.Navigator>
  );
};

export default Profile;
