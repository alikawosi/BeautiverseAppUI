import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {AddCircle, Edit, More, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, EmptyScreen, ModalWrapper} from '../commons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadingScreenLayout from '../commons/LoadingScreenLayout';

const SelectAddressModal = ({route}) => {
  const {onSubmit = () => false} = route.params;
  const {goBack, navigate} = useNavigation();

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

  const onDelete = id => {
    deleteAddress.mutate(id);
  };
  const onEdit = item => {
    navigate('AddAddressModal', {
      label: 'Add Address',
      initialValues: {name: item.name, address: item.address},
      id: item.id,
      refetch: () => getSavedAddress.refetch(),
    });
  };

  const renderOption = item => {
    return (
      <View key={item.id} style={tw.style('flex-row pb-8')}>
        <Pressable
          onPress={() => {
            onSubmit(item.address);
            goBack();
          }}
          style={tw`mx-5 flex-1 mr-2`}
          key={item.id}>
          <Text style={tw`bv-sans-base`}>{item.name}</Text>
          <Text style={tw`bv-med-sm `}>{item.address}</Text>
        </Pressable>
        <Menu style={tw``}>
          <MenuTrigger onSelect={value => alert(`Selected number: ${value}`)}>
            <More size="18" color="#D9D9D9" style={tw`p-3 m-2`} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={tw`w-30 rounded-lg`}>
            <MenuOption onSelect={() => {}}>
              <Pressable
                onPress={() => onEdit(item)}
                style={tw`flex-row items-center m-1 `}>
                <Edit size="16" color="#5948AA" style={tw`p-3 m-2`} />
                <Text style={tw`bv-med-sm text-primary`}>Edit</Text>
              </Pressable>
            </MenuOption>
            <MenuOption onSelect={() => {}}>
              <Pressable
                onPress={() => onDelete(item.id)}
                style={tw`flex-row items-center m-1 `}>
                <Trash size="16" color="#D70D19" style={tw`p-3 m-2`} />
                <Text style={tw`bv-med-sm text-[#FF614C]`}>Delete</Text>
              </Pressable>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  return (
    <ModalWrapper
      titleSeparator
      title="Saved Address"
      type="fromBottom"
      style={tw`min-h-100 max-h-150 bg-white rounded-30`}>
      <View style={tw`min-h-80 max-h-130`}>
        {getSavedAddress.isFetching || getSavedAddress.isLoading ? (
          <LoadingScreenLayout style={tw`flex-1`} />
        ) : getSavedAddress.data.length === 0 ? (
          <EmptyScreen
            description={'you have no saved location yet...'}
            style={tw`mb-2 flex-1`}
          />
        ) : (
          <FlatList
            data={getSavedAddress.data}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={tw`w-full bg-black bg-opacity-10 h-0.25 mb-4`} />
            )}
            renderItem={({item}) => renderOption(item)}
          />
        )}
      </View>

      <Button
        secondary
        style={tw`mb-5`}
        title="Add a new address"
        icon={<AddCircle size="24" color="#414141" />}
        onPress={() => {
          navigate('AddAddressModal', {
            label: 'Add Address',
            refetch: () => getSavedAddress.refetch(),
          });
        }}
      />
    </ModalWrapper>
  );
};

export {SelectAddressModal};
