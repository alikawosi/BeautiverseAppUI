import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import PopularCategories from './PopularCategories';
import TopRatedProfessionals from './TopRatedProfessionals';
import {BackButton, ScreenHeader} from '../../components/commons';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopularCategories"
        component={PopularCategories}
        options={{title: 'Popular Categories'}}
      />
      <Stack.Screen
        name="TopRatedProfessionals"
        component={TopRatedProfessionals}
        options={{title: 'Top Rated Professionals'}}
      />
    </Stack.Navigator>
  );
};

export default Home;
