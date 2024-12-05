import React, {useEffect, useState} from 'react';
import {View, Pressable, Text, ActivityIndicator} from 'react-native';
import {Gps, SaveAdd} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, InputWrapper} from '../commons';
import {SavedLocationData} from '../../constants';
import {useLocation} from '../../hooks';
import axios from 'axios';
import {useQuery} from 'react-query';

const LocationSearch = ({
  label,
  placeholder,
  desription,
  style,
  onSubmit = () => false,
}) => {
  const {navigate} = useNavigation();
  const [address, setAddress] = useState('');
  const [detectAddress, setDetectAddress] = useState(false);
  const userlocation = useLocation().location;

  useEffect(() => {
    onSubmit(address);
  }, [address]);

  const getAddressByCoords = useQuery({
    queryKey: ['GetAddressByCoords'],
    enabled: detectAddress,
    queryFn: () =>
      axios.get('https://beautiverse.ca/api/beautiverse/location/get_address', {
        params: {
          lat: userlocation.coords.latitude,
          lng: userlocation.coords.longitude,
        },
      }),
    onSuccess: data => {
      setAddress(data);
      setDetectAddress(false);
    },
  });
  return (
    <View style={tw.style('flex-1', style)}>
      {desription ? (
        <Text style={tw`bv-med-xs text-[10px] capitalize text-center mb-4`}>
          {desription}
        </Text>
      ) : null}
      {getAddressByCoords.isFetching ? (
        <ActivityIndicator />
      ) : (
        <InputWrapper
          label={label}
          placeholder={address ? null : placeholder}
          isActive={true}
          onPress={() => {
            navigate('SearchModal', {
              title: 'Saved Address',
              data: SavedLocationData,
              placeholder: 'Enter your address',
              type: 'location',
              onSubmit: item => setAddress(item.title),
            });
          }}
          suffix={
            <Pressable
              onPress={() => {
                navigate('SelectAddressModal', {
                  onSubmit: val => setAddress(val),
                });
              }}
              style={tw`p-3 `}>
              <SaveAdd color="#5948AA" size={22} />
            </Pressable>
          }>
          <Text style={tw`bv-med-xs `}>{address}</Text>
        </InputWrapper>
      )}

      <View style={tw`flex-row justify-center`}>
        <Button
          defaultColor="#5948AA"
          title={'Detect My Location'}
          icon={<Gps size={18} color="#5948AA" />}
          onPress={() => {
            detectAddress
              ? getAddressByCoords.refetch()
              : setDetectAddress(true);
          }}
        />
      </View>
    </View>
  );
};

export {LocationSearch};
