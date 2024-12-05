import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from './Chat';
import ChatFAQ from './ChatFAQ';

const Stack = createNativeStackNavigator();

const ChatScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatFAQ" component={ChatFAQ} />
    </Stack.Navigator>
  );
};

export default ChatScreens;
