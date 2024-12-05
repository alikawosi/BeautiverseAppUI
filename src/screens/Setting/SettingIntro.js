import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {ArrowRight2, DollarCircle, LogoutCurve} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {SettingCard, UserProfileCard} from '../../components/screens/Setting';
import {SETTING_CONST} from '../../constants';
import {useAuth} from '../../hooks/useAuth';

const SettingIntro = () => {
  const auth = useAuth();
  const userInfo = auth.userInfo;

  return (
    <SafeAreaView edges={['top']} style={tw`flex flex-1 bg-background`}>
      <ScrollView
        contentContainerStyle={tw` pb-4`}
        showsVerticalScrollIndicator={false}>
        <UserProfileCard
          name={userInfo.first_name + ' ' + userInfo.last_name}
          avatar={userInfo.avatar_url}
          isVerified={userInfo.isVerified}
          style={tw`my-5 py-5 px-5 rounded-2xl bg-white `}
        />
        <View style={tw`px-5 py-2 bg-white rounded-2xl`}>
          {SETTING_CONST.settingMenuData.map(item => {
            return (
              <SettingCard
                key={item.key}
                style={tw`px-0`}
                title={item.title}
                icon={item.icon}
                description={item.description}
                rootRoute={item.rootRoute}
                route={item.route}
                link={item.link}
              />
            );
          })}
          <Pressable
            onPress={() => {
              auth.logout();
            }}
            style={tw.style('flex-row justify-between py-5 ')}>
            <LogoutCurve color="#F04659" size={22} />
            <View style={tw`ml-2.5 flex-1 `}>
              <Text style={tw`bv-heading-base text-[#F04659]`}>Logout</Text>
            </View>
            <ArrowRight2 color="#F04659" size={22} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingIntro;
