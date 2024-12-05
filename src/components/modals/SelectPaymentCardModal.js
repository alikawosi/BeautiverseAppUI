import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList} from 'react-native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';
import {PaymentMethodCard} from '../screens/Setting/Payments/PaymentMethodCard';
import {AddCircle} from 'iconsax-react-native';
import {useQuery} from 'react-query';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const SelectPaymentCardModal = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const {onSubmit = () => false, options} = route.params;

  const getCards = useQuery({
    queryKey: ['GetPaymentMethods'],
    queryFn: async () =>
      await axios.get('https://beautiverse.ca/api/beautiverse/user/cards'),
    onError: () => goBack(),
  });

  const renderOption = item => {
    return (
      <PaymentMethodCard
        key={item.id}
        brand={item.brand}
        id={item.id}
        style={tw`mb-3`}
        isPrimary={item.primary}
        title={item.brand}
        last4cardNumber={item.last4}
        onPress={() => {
          onSubmit(item);
          goBack();
        }}
      />
    );
  };

  return (
    <ModalWrapper
      titleSeparator
      title="Saved Cards"
      type="fromBottom"
      style={tw`min-h-100 max-h-150  rounded-30`}>
      <FlatList
        data={options}
        style={tw`min-h-80`}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={tw`w-full bg-black bg-opacity-10 h-0.25 mb-4`} />
        )}
        renderItem={({item}) => renderOption(item)}
      />

      <Button
        secondary
        title={'Add a New Card'}
        style={tw``}
        containerStyle={tw`self-center w-full mb-5 `}
        icon={<AddCircle size={24} color="#5948AA" />}
        onPress={() => {
          navigate('AddPaymentMethodModal', {
            onSubmit: () => getCards.refetch(),
          });
        }}
      />
    </ModalWrapper>
  );
};

export {SelectPaymentCardModal};
