import React from 'react';
import axios from 'axios';
import {View, Text} from 'react-native';
import {useQuery} from 'react-query';
import {ArrowRight2, TickCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {Easing, FadeInUp} from 'react-native-reanimated';

import tw from '../../../../tailwind';
import {useAuth} from '../../../hooks/useAuth';
import {Button} from '../../../components/commons';
import {UserProfileCard} from '../../../components/screens/Setting';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const ProfileDetails = () => {
  const {navigate} = useNavigation();
  const userInfo = useAuth().userInfo;

  const userVerificationStatus = useQuery({
    queryFn: () => {
      return axios.get('/user/identity_verification/status');
    },
    onSuccess: data => console.log(data),
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex bg-background flex-1 pb-4 `}>
      <UserProfileCard
        name={userInfo.first_name + ' ' + userInfo.last_name}
        joinedDate={userInfo.joinedDate}
        isShowed
        isVerified={userInfo.isVerified}
        avatar={userInfo.avatar_url}
        style={tw` px-5 py-4 mb-4 bg-white rounded-2xl`}
      />
      <View style={tw`px-7 py-7 bg-white rounded-2xl `}>
        <Text style={tw`bv-heading-base mb-2`}>Identity Verification</Text>
        <Text style={tw`bv-med-sm mb-6`}>
          Show others you’re really you with the identity verification badge.
        </Text>
        {userVerificationStatus.isLoading ||
        userVerificationStatus.isFetching ? (
          <LoadingScreenLayout style={tw`bg-background`} />
        ) : (
          <Animated.View
            entering={FadeInUp.duration(350).easing(Easing.cubic(Easing.out))}>
            {userVerificationStatus.data !== 'pass' ? (
              userVerificationStatus.data === 'waiting' ? (
                <View style={tw`px-4 py-2 rounded-2xl bg-[#5948AA20] mb-6`}>
                  <Text style={tw`bv-med-base text-primary`}>
                    Your verification process is in progres...
                  </Text>
                </View>
              ) : (
                <Button
                  title="Start Verification Process"
                  disabled={userInfo.isVerified}
                  primary
                  containerStyle={tw`w-[70%] h-12 m-0 justify-center p-0 `}
                  style={tw`rounded-10 p-0 m-0`}
                  icon={<ArrowRight2 size={18} color="#FFFFFF" />}
                  titleStyle={tw`bv-sans-sm`}
                  reverse
                  onPress={() => navigate('Identity', {screen: 'Verification'})}
                />
              )
            ) : (
              <View style={tw`flex-row items-center mb-6`}>
                <TickCircle size={22} color="#56BD70" />
                <Text style={tw`bv-sans-base ml-2 text-basicGreen`}>
                  Verified!
                </Text>
              </View>
            )}
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetails;
