import React from 'react';
import axios from 'axios';
import {View, ScrollView} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import tw from '../../../../tailwind';
import {Button, EmptyScreen} from '../../../components/commons';
import {PaymentMethodCard} from '../../../components/screens/Setting';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const PaymentMethods = () => {
  const {navigate, goBack} = useNavigation();
  const getPaymentMethods = useQuery({
    queryKey: ['GetPaymentMethods'],
    queryFn: () => axios('https://beautiverse.ca/api/beautiverse/user/cards'),
    onError: () => goBack(),
    keepPreviousData: false,
    // onSuccess: () => console.log('first'),
  });

  const updatePrimaryCard = useMutation({
    mutationFn: cardId => {
      axios.post(
        'https://beautiverse.ca/api/beautiverse/user/card/update_primary',
        {
          id: cardId,
        },
      );
    },
    onSuccess: () => {
      getPaymentMethods.refetch();
      Toast.show({text1: 'Primary Card Changed!'});
    },
  });
  const deleteCard = useMutation({
    mutationFn: cardId => {
      return axios.delete('https://beautiverse.ca/api/beautiverse/user/card', {
        params: {id: cardId},
      });
    },
    onSuccess: () => {
      getPaymentMethods.refetch();
      Toast.show({text1: 'Card Deleted!'});
    },
  });
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex flex-1 bg-background pb-4 `}>
      {getPaymentMethods.isFetching || getPaymentMethods.isLoading ? (
        <LoadingScreenLayout style={tw` bg-background`} />
      ) : getPaymentMethods.data.length === 0 ? (
        <EmptyScreen
          description={'You Have No Payment Method Yet...'}
          style={tw`flex-1`}
        />
      ) : (
        <ScrollView>
          <View style={tw` bg-white px-5 rounded-2xl py-2`}>
            {getPaymentMethods.data.map(item => {
              return (
                <PaymentMethodCard
                  key={item.id}
                  id={item.id}
                  style={tw`mb-3 py-3`}
                  isPrimary={item.primary}
                  brand={item.brand}
                  last4cardNumber={item.last4}
                  onSubmitPrimary={id => updatePrimaryCard.mutate(id)}
                  onDeletePress={id => deleteCard.mutate(id)}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <Button
        secondary
        title={'Add a New Card'}
        style={tw`mx-5`}
        containerStyle={tw`self-center w-full `}
        icon={<AddCircle size={24} color="#5948AA" />}
        onPress={() => {
          navigate('AddPaymentMethodModal', {
            onSubmit: () => getPaymentMethods.refetch(),
          });
        }}
      />
    </SafeAreaView>
  );
};

export default PaymentMethods;
