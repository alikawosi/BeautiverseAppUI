import {FlatList, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {SettingCard} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const WalletMenu = () => {
  const renderOption = ({item}) => {
    return (
      <SettingCard
        key={item.key}
        title={item.title}
        rootRoute={item.rootRoute}
        route={item.route}
      />
    );
  };
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex bg-white items-center justify-center flex-1 pb-4  `}>
      <Text style={tw`bv-sans-base `}>Coming Soon!...</Text>
      {/* <FlatList
        keyExtractor={item => String(item.key)}
        data={SETTING_CONST.walletMenuData}
        renderItem={renderOption}
      /> */}
    </SafeAreaView>
  );
};

export default WalletMenu;
