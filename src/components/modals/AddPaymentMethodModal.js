import axios from 'axios';
import {View} from 'react-native';
import React from 'react';
import {useMutation} from 'react-query';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {useForm} from '../../hooks';
import {GENERAL_CONST} from '../../constants';
import {Button, Form, ModalWrapper} from '../commons';


const AddPaymentMethodModal = () => {

  const params = useRoute().params;
  const {goBack} = useNavigation();
  const {form} = useForm({
    fields: GENERAL_CONST.addCreditCardFormData,
  });
 

  const addPaymentMethod = useMutation({
    mutationFn: paymentMethodInfo => {
      var cardinformation = {
        name: paymentMethodInfo.cardHolderFullName,
        number: paymentMethodInfo.cardNumber,
        cvc: paymentMethodInfo.cvc,
        exp_month: paymentMethodInfo.expiryDate.substring(0, 2),
        exp_year: (
          parseInt(paymentMethodInfo.expiryDate.substring(2, 4), 10) + 2000
        ).toString(),
        postal_code: paymentMethodInfo.postalCode,
      };
      return axios.post(
        'https://beautiverse.ca/api/beautiverse/user/card/create',
        cardinformation,
      );
    },
    onSuccess: () => {
      Toast.show({text1: 'Card Added!'});
      params.onSubmit();
      goBack();
    },
  });

  return (
    <ModalWrapper
      titleSeparator
      title="Add Payment Card"
      type="fromBottom"
      style={tw.style('w-full h-auto bg-white rounded-[30px] px-5')}>
      <View style={tw.style('w-11/12 self-center flex-col pb-2')}>
        <Form fields={GENERAL_CONST.addCreditCardFormData} form={form} />
        <Button
          title={'Add Card'}
          primary
          disabled={!form.formState.isValid}
          loading={addPaymentMethod.isLoading}
          onPress={() => {
            addPaymentMethod.mutate(form.getValues());
          }}
        />
      </View>
    </ModalWrapper>
  );
};

export {AddPaymentMethodModal};
