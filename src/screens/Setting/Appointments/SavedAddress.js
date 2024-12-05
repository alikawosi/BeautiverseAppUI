import {ScrollView} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import tw from '../../../../tailwind';
import {LocationCard} from '../../../components/elements';
import {Button, EmptyScreen} from '../../../components/commons';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const SavedAddress = () => {
  const {navigate} = useNavigation();
  const getSavedAddress = useQuery({
    queryFn: async () =>
      await axios.get('https://beautiverse.ca/api/beautiverse/user/addresses'),
    queryKey: ['GetAddresses'],
  });
  const deleteAddress = useMutation({
    mutationFn: id =>
      axios.post('https://beautiverse.ca/api/beautiverse/user/address/delete', {
        address_id: id,
      }),
    onSuccess: () => {
      Toast.show({text1: 'Address Successfully deleted.'});
      getSavedAddress.refetch();
    },
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex flex-1 bg-background pb-4`}>
      {getSavedAddress.isLoading || getSavedAddress.isFetching ? (
        <LoadingScreenLayout style={tw`flex-1 bg-background`} />
      ) : getSavedAddress.data.length === 0 ? (
        <EmptyScreen
          style={tw`flex-1 bg-background`}
          description={'you have no saved location yet...'}
        />
      ) : (
        <ScrollView>
          {getSavedAddress.data.map(item => {
            return (
              <LocationCard
                key={item.id}
                id={item.id}
                title={item.name}
                description={item.address}
                value={item.value}
                style={tw`bg-white px-5 rounded-2xl py-4`}
                onDeletePress={() => deleteAddress.mutate(item.id)}
                onUpdatePress={() => getSavedAddress.refetch()}
              />
            );
          })}
        </ScrollView>
      )}
      {}
      <Button
        secondary
        style={tw`mx-5`}
        title={'add a new address'}
        containerStyle={tw`w-full`}
        icon={<AddCircle size={24} color="#5948AA" />}
        onPress={() => {
          navigate('AddAddressModal', {
            label: 'Add Address',
            refetch: () => getSavedAddress.refetch(),
          });
        }}
      />
    </SafeAreaView>
  );
};

export default SavedAddress;
