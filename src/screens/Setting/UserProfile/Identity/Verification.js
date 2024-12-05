import {Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import tw from '../../../../../tailwind';
import {Button, Form} from '../../../../components/commons';
import {useForm} from '../../../../hooks';
import {SETTING_CONST} from '../../../../constants';
import {useMutation} from 'react-query';
import axios from 'axios';

const Verification = () => {
  const {navigate} = useNavigation();
  const device = useCameraDevices();
  const {form} = useForm({
    fields: SETTING_CONST.identityVerificationFormData,
    defaultValue: {countryRegion: '', type: null},
  });
  const type = form.watch('type');
  const province = form.watch('countryRegion');

  const requestIdentityVerification = useMutation({
    mutationFn: data => {
      let verificationData = {
        type: form.getValues('type'),
        country: form.getValues('countryRegion').value,
        front_card: data.front_card,
        back_card: data.back_card,
        user_image: data.user_image,
      };

      //axios.post('/user/identity_verification/request', verificationData);
    },
    //onSuccess: () => navigate('UserProfileSetting'),
  });

  const handleOpenCamera = async () => {
    const permissionStatus = await Camera.getCameraPermissionStatus();
    if (permissionStatus === 'authorized') {
      const newPermision = await Camera.requestCameraPermission();
      if (newPermision === 'authorized') {
        navigate('CameraVerification', {
          onSubmit: images => requestIdentityVerification.mutate(images),
          isLoading: requestIdentityVerification.isLoading,
          device: device,
        });
      }
    }
  };
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex bg-white flex-1 py-6 px-5 `}>
      <View style={tw`mb-4`}>
        <Text style={tw`bv-heading-base capitalize`}>
          Please provide goverment ID
        </Text>
      </View>
      <Form form={form} fields={SETTING_CONST.identityVerificationFormData} />
      <Text style={tw` bv-med-sm text-grayBorder`}>
        These notes will be automatically sent to your clients
      </Text>
      <Button
        primary
        disabled={type && province ? false : true}
        containerStyle={tw`bottom-5 absolute w-full self-center`}
        title={'Continue'}
        onPress={handleOpenCamera}
      />
    </SafeAreaView>
  );
};

export default Verification;
