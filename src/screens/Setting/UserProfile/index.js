import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileDetails from './ProfileDetails';
import EditUserProfile from './EditUserProfile';
import Identity from './Identity';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const UserProfileSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="Identity"
        component={Identity}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserProfileSetting;
