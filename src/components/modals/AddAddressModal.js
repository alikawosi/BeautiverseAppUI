import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import {Gps} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import tw from '../../../tailwind';
import {Button, Form, ModalWrapper} from '../commons';
import {addLocationFormData} from '../../constants';
import {useForm, useLocation} from '../../hooks';

const AddAddressModal = ({route}) => {
  const {
    label,
    onSubmit = () => false,
    initialValues,
    id,
    refetch = () => false,
  } = route.params;
  const {goBack} = useNavigation();
  const [detectAddress, setDetectAddress] = useState(false);
  const {form} = useForm({
    defaultValue: initialValues ? initialValues : null,
    fields: addLocationFormData,
  });
  const [isLoading, setIsLoading] = useState(false);
  const userlocation = useLocation().location;

  const addAddress = useMutation({
    mutationFn: addressInfo =>
      axios.post(
        'https://beautiverse.ca/api/beautiverse/user/address',
        addressInfo,
      ),
    onSuccess: () => {
      setIsLoading(false);
      refetch();
      Toast.show({text1: 'Address Added'});
      goBack();
    },
    onError: () => goBack(),
  });

  const updateAddress = useMutation({
    mutationFn: addressInfo =>
      axios.post(
        'https://beautiverse.ca/api/beautiverse/user/address/update',
        addressInfo,
      ),
    onSuccess: () => {
      setIsLoading(false);
      refetch();
      Toast.show({text1: 'Address Updated'});
      goBack();
    },
    onError: () => goBack(),
  });

  const getAddressByCoords = useQuery({
    queryKey: ['GetAddress'],
    enabled: detectAddress,
    queryFn: () =>
      axios.get('https://beautiverse.ca/api/beautiverse/location/get_address', {
        params: {
          lat: userlocation.coords.latitude,
          lng: userlocation.coords.longitude,
        },
      }),
    onSuccess: data => {
      form.setValue('address', data);
      setDetectAddress(false);
    },
  });

  const onPressHandler = () => {
    let addressDetail = {
      name: form.getValues('name'),
      address: form.getValues('address'),
    };
    setIsLoading(true);

    if (initialValues) {
      updateAddress.mutate({
        address_id: id,
        ...addressDetail,
      });
    } else {
      addAddress.mutate(addressDetail);
    }
    onSubmit();
  };

  return (
    <ModalWrapper
      titleSeparator
      title={label}
      type="fromBottom"
      style={tw`w-full h-auto bg-white rounded-[30px]`}>
      <Form
        fields={addLocationFormData}
        form={form}
        style={tw.style('px-4 py-0')}
      />

      <View style={tw`flex-row justify-center mb-2`}>
        {getAddressByCoords.isFetching || getAddressByCoords.isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={'Detect My Location'}
            defaultColor="#575757"
            icon={<Gps size={18} color="#575757" />}
            onPress={() => setDetectAddress(true)}
          />
        )}
      </View>
      <Button
        primary={!initialValues ? true : false}
        secondary={initialValues ? true : false}
        loading={isLoading}
        title={initialValues ? 'Update' : 'Confirm'}
        onPress={() => onPressHandler()}
      />
    </ModalWrapper>
  );
};

export {AddAddressModal};
