import React from 'react';
import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {TabBar, TabBarItem} from '../../../components/commons';
import {ReferralDetail} from '../../../components/screens/Setting';

const Referrals = () => {
  return (
    <SafeAreaView edges={['bottom']} style={tw`bg-white flex-1 pb-4 px-7 `}>
      <Image
        style={tw`w-full h-34 justify-center items-center rounded-15 mb-6`}
        resizeMode="cover"
        source={require('../../../assets/media/ReferralBanner.png')}
      />
      <View
        style={tw`bg-[#5948AA14] p-2 justify-center items-center rounded-10 mb-4`}>
        <Text style={tw`bv-sans-lg mb-2`}>Earned</Text>
        <Text style={tw`bv-sans-1.5xl text-primary`}>$0</Text>
      </View>

      <TabBar
        style={tw`bg-white border-b-2 border-b-lightGray mb-4 p-0 rounded-0 h-auto`}
        itemStyle={tw`shadow-none`}
        activeItemStyle={
          'border-b-2 py-2 border-primary shadow-none rounded-0'
        }>
        <TabBarItem
          style={tw`flex-1`}
          options={{
            title: 'Friends',
          }}>
          <ReferralDetail />
        </TabBarItem>
        <TabBarItem
          style={tw`flex-1`}
          options={{
            title: 'Professionals',
          }}>
          <ReferralDetail />
        </TabBarItem>
      </TabBar>
    </SafeAreaView>
  );
};

export default Referrals;
