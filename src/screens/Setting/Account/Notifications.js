import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

import tw from '../../../../tailwind';
import {NotificationType} from '../../../components/screens/Setting';
import {ScrollView} from 'react-native';

const Notifications = () => {
  return (
    <SafeAreaView edges={['bottom']} style={tw`flex bg-white flex-1 px-6 `}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationType title={'appointment Notifications'} />
        <NotificationType title={'Rebooking Reminders'} />
        <NotificationType title={'payment notfications'} />
        <NotificationType title={'appointment Notifications'} />
        <NotificationType title={'messages'} />
        <NotificationType title={'Offers from Providers'} />
        <NotificationType seprator={false} title={'Offers from Beautiverse'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
