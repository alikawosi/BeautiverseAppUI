import React from 'react';
import {View, Text, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {NotificationCard} from '.';
import {CHAT_CONST} from '../../../constants';

const NotificationTab = () => {
  return (
    <View style={tw`flex-1`}>
      <Text style={tw`bv-sans-base mb-5`}>New</Text>
      <FlatList
        //ListHeaderComponent={<Text style={tw`bv-sans-base mb-5`}>New</Text>}
        data={CHAT_CONST.notificationListData1}
        renderItem={({item}) => <NotificationCard {...item} />}
        ItemSeparatorComponent={() => (
          <View style={tw`w-full h-px bg-black opacity-20 my-4`} />
        )}
        keyExtractor={(item, index) => String(item.id || index)}
        showsVerticalScrollIndicator={false}
      />
      <Text style={tw`bv-sans-base my-5`}>
        Today / Yesterday / Last Week / Last Month
      </Text>
      <FlatList
        // ListHeaderComponent={
        //   <Text style={tw`bv-sans-base my-5`}>
        //     Today / Yesterday / Last Week / Last Month
        //   </Text>
        // }
        data={CHAT_CONST.notificationListData2}
        renderItem={({item}) => <NotificationCard {...item} />}
        ItemSeparatorComponent={() => (
          <View style={tw`w-full h-px bg-black opacity-20 my-4`} />
        )}
        keyExtractor={(item, index) => String(item.id || index)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export {NotificationTab};
