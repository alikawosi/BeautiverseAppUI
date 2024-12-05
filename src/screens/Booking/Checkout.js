import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AddCircle, ArrowDown2, Card, Ticket} from 'iconsax-react-native';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {
  ProfessionalProfileSummary,
  SelectedServiceCard,
} from '../../components/screens/Booking';
import {
  Button,
  CheckBox,
  EmptyScreen,
  InputWrapper,
} from '../../components/commons';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';
import Animated, {Easing, FadeOut} from 'react-native-reanimated';
import {PaymentIcon} from 'react-native-payment-icons';

const Checkout = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const [couponeActive, setCouponeActive] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPolicyAgree, setIsPolicyAgree] = useState(false);

  const getCards = useQuery({
    queryKey: ['GetPaymentMethods'],
    queryFn: async () =>
      await axios.get('https://beautiverse.ca/api/beautiverse/user/cards'),
    onError: () => goBack(),
    onSuccess: () => console.log('first'),
  });

  const submitBooking = useMutation({
    mutationFn: registeringData =>
      axios.post('/booking/submit', registeringData),
    onSuccess: () => {
      return navigate('SuccessedModal', {
        successedTitle: 'Booking Successful ',
        successedDescription:
          'We’ve send the booking Confirmation to your phone',
        buttonText: 'Got It!',
      });
    },
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
    onSuccess: async () => {
      await getCards.refetch();
      if (getCards.data.length > 0) {
        BookService();
      } else {
        console.log('fuck');
      }
    },
  });

  const BookService = () => {
    let cardId = null;
    if (getCards.data?.length > 0) {
      cardId = selectedCard.id;
    } else {
      cardId = getCards.data[0].id;
    }
    let bookingInfo = {
      amount: route.params.servicesPrice + route.params.transportationFee,
      card_id: cardId,
      session: route.params.session,
      where: route.params.where,
      address: route.params.selectedAddress,
      date: route.params.selectedDate,
      time: route.params.selectedTime,
      note: route.params.note,
      attachments: route.params.attachments,
    };
    submitBooking.mutate(bookingInfo);
  };
  console.log(selectedCard);
  return getCards.isLoading ? (
    <LoadingScreenLayout />
  ) : (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1 bg-white p-5 `}>
      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => Keyboard.dismiss()}>
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={tw` flex-1 `}>
            <ProfessionalProfileSummary
              img={route.params.beautician.img.url}
              title={route.params.beautician.title}
              verified={route.params.beautician.verified}
              address={route.params.beautician.location.address}
              style={tw`mb-4`}
            />
            <View
              style={tw` flex-row justify-between w-full bg-lightGray py-3 px-4 rounded-15 mb-5`}>
              <Text
                style={tw`bv-heading-base text-primary`} //serviceDate
              >
                {dayjs(route.params.selectedDate * 1000).format(
                  'dddd, MMMM D, YYYY',
                )}
              </Text>
              <Text
                style={tw`bv-heading-base text-primary`} //serviceTime
              >
                {dayjs(
                  route.params.selectedTime * 1000 +
                    route.params.selectedDate * 1000,
                ).format('hh : mm A')}
              </Text>
            </View>
            <View style={tw`mb-5 border-b-2 border-background`}>
              {route.params.selectedServices.map((item, index) => {
                return (
                  <SelectedServiceCard
                    key={index}
                    title={item.serviceTitle}
                    variationTitle={item.variationTitle}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    duration={item.duration}
                    style={tw`mb-4`}
                    seprator={false}
                  />
                );
              })}

              <View
                style={tw`  justify-between w-full bg-lightGray py-3 px-4 rounded-15 mb-5`}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`bv-med-sm`}>{`Service Price${
                    route.params.selectedServices.length > 1 ? 's' : ''
                  }:`}</Text>
                  <Text style={tw`bv-sans-sm`}>
                    {`  $${route.params.servicesPrice}`}
                  </Text>
                </View>
                {route.params.transportationFee !== '' ? (
                  <View style={tw`flex-row justify-between mb-3`}>
                    <Text style={tw`bv-med-sm`}>Transportation Fee:</Text>
                    <Text
                      style={tw`bv-sans-sm`}>{`$ ${route.params.transportationFee}`}</Text>
                  </View>
                ) : null}
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`bv-med-sm`}>Total:</Text>
                  <Text style={tw`bv-sans-sm`}>
                    {`$ ${
                      route.params.servicesPrice +
                      route.params.transportationFee
                    }`}
                  </Text>
                </View>
              </View>
            </View>
            {getCards.data?.length > 0 ? (
              <InputWrapper
                isActive
                //label={'Card On File'}
                modalTitle={'Saved Cards'}
                placeholder={!selectedCard?.last4 ? 'Please Select Card' : null}
                labelFix
                style={tw`mb-5`}
                preffix={
                  selectedCard ? (
                    <PaymentIcon
                      style={tw`mx-2 w-2/7 `}
                      height={35}
                      width={35}
                      type={
                        selectedCard.brand === 'Visa'
                          ? 'visa'
                          : selectedCard.brand
                      }
                    />
                  ) : (
                    <Card size={20} color={'#5948AA'} />
                  )
                }
                suffix={<ArrowDown2 size={20} color={'#717171'} />}
                options={getCards.data}
                onPress={() =>
                  navigate('SelectPaymentCardModal', {
                    options: getCards.data,
                    onSubmit: val => setSelectedCard(val),
                  })
                }>
                <View style={tw` w-4/5 justify-center items-center `}>
                  <Text style={tw`   bv-sans-base`}>
                    {selectedCard
                      ? `****  ****  ****  ${selectedCard.last4}`
                      : ''}
                  </Text>
                </View>
              </InputWrapper>
            ) : (
              <Animated.View
                exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}>
                <EmptyScreen
                  description={'No payment Card verified! Please add one!'}
                />
                <Button
                  secondary
                  title={'Add a New Card'}
                  style={tw`mb-5`}
                  containerStyle={tw`self-center w-full `}
                  icon={<AddCircle size={24} color="#5948AA" />}
                  onPress={() => {
                    navigate('AddPaymentMethodModal', {
                      onSubmit: () => getCards.refetch(),
                    });
                  }}
                />
              </Animated.View>
            )}
            {/* {couponeActive ? (
              <View>
                <Input
                  label={'Coupon Code'}
                  labelFix
                  placeholder={'Enter The Code'}
                  style={tw`mb-4`}
                  suffix={
                    <Button
                      title={'apply'}
                      primary
                      style={tw`h-auto py-2 px-3`}
                      titleStyle={tw`bv-heading-sm`}
                    />
                  }
                />
              </View>
            ) : (
              <Pressable
                onPress={() => setCouponeActive(true)}
                style={tw`flex-row items-center justify-center flex-1 p-2 mb-4`}>
                <Ticket size={24} color="#5948AA" />
                <Text style={tw`bv-reg-sm ml-2`}>Do you have coupone?</Text>
              </Pressable>
            )} */}

            <CheckBox
              labelStyle={tw`bv-sans-sm`}
              size={24}
              style={tw`items-start mb-15 `}
              label={
                'I have read and agree to the cancellation policy of Beautiverse  privacy policy.'
              }
              isChecked={isPolicyAgree}
              onPress={() => setIsPolicyAgree(!isPolicyAgree)}
            />
          </ScrollView>
          <Button
            title={'Confirm'}
            titleStyle={tw`bv-heading-sm`}
            loading={addPaymentMethod.isLoading || submitBooking.isLoading}
            primary
            disabled={!isPolicyAgree}
            style={tw`w-full py-2 px-3`}
            containerStyle={tw`w-full `}
            onPress={() => {
              BookService();
            }}
          />
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Checkout;
