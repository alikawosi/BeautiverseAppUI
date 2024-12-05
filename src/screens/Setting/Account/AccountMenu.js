import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

import tw from '../../../../tailwind';
import {SettingCard} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const AccountMenu = () => {
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
      style={tw`flex bg-background flex-1 pb-4  `}>
      <FlatList
        keyExtractor={item => String(item.key)}
        data={SETTING_CONST.accountMenuData}
        renderItem={renderOption}
        contentContainerStyle={tw`bg-white rounded-2xl`}

      />
    </SafeAreaView>
  );
};

export default AccountMenu;
