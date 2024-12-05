import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ReviewScreen from './ReviewScreen';
import DetailedReview from './DetailedReview';
import {BackButton, ScreenHeader} from '../../components/commons';

const Stack = createNativeStackNavigator();

const Review = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReviewScreen"
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{title: 'Review'}}
      />
      <Stack.Screen
        name="DetailedReview"
        component={DetailedReview}
        options={{title: 'Review'}}
      />
    </Stack.Navigator>
  );
};

export default Review;
