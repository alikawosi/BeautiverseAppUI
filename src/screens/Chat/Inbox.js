import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {MessageTab, NotificationTab} from '../../components/screens/Chat';

const Inbox = () => {
  const [active, setActive] = useState(0);

  const tabPressHandler = id => {
    setActive(id);
  };

  return (
    <SafeAreaView edges={['top']} style={tw`px-6 bg-white flex-1`}>
      <View style={tw`flex-row justify-around px-6`}>
        <Pressable onPress={() => tabPressHandler(0)}>
          <Text
            style={tw.style('bv-heading-base text-grayBorder', {
              'text-primary': active === 0,
            })}>
            Messages
          </Text>
        </Pressable>
        <Pressable onPress={() => tabPressHandler(1)}>
          <Text
            style={tw.style('bv-heading-base text-grayBorder', {
              'text-primary': active === 1,
            })}>
            Notifications
          </Text>
        </Pressable>
      </View>
      <View style={tw`w-full h-0.5 bg-[#F0F0F0] mt-2 mb-6`} />
      <View style={tw`flex-1`}>
        {active === 0 ? <MessageTab /> : <NotificationTab />}
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
