import React from 'react';
import {View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {SubscriptionCard} from '../../components/screens/Appointment';
import {SubscriptionCardData} from '../../constants';

const Subscriptions = () => {
  const renderItem = ({item}) => {
    return <SubscriptionCard style={tw`w-full`} {...item} />;
  };
  return (
    <SafeAreaView edges={['left', 'right']} style={tw`flex-1 bg-white`}>
      <FlatList
        keyExtractor={(item, index) => String(item.id || index)}
        data={SubscriptionCardData}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-4`}
        ItemSeparatorComponent={() => <View style={tw`h-4`} />}
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
