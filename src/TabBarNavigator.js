import React from 'react';
import {Text} from 'react-native';
import {
  CalendarTick,
  Direct,
  Home as HomeIcon,
  User,
} from 'iconsax-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import tw from '../tailwind';
import Home from './screens/Home';
import Appointment from './screens/Appointmnet';
import Setting from './screens/Setting';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        title: route.name,
        tabBarLabel: ({focused, title}) => {
          focused ? (title = route.name) : (title = '');
          return <Text style={tw`text-primary text-xs`}>{title}</Text>;
        },
        tabBarStyle: tw`min-h-20 py-3 shadow-md rounded-t-20`,
        tabBarIcon: ({focused}) => {
          let icon = null;
          switch (route.name) {
            case 'Home':
              icon = HomeIcon;
              break;
            case 'Appointment':
              icon = CalendarTick;
              break;
            // case 'Inbox':
            //   icon = Direct;
            //   break;
            case 'Setting':
              icon = User;
              break;
          }
          return React.createElement(icon, {
            color: focused ? '#5948AA' : '#717171',
            size: 28,
            variant: focused ? 'Bulk' : null,
          });
        },
      })}>
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{tabBarBadge: 3, unmountOnBlur: true}}
      /> */}
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default TabBar;
