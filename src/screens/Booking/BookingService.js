import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Image, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AddCircle, CloseCircle, GalleryAdd} from 'iconsax-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Button, EmptyScreen, Input} from '../../components/commons';
import {Footer, PhotoPicker, SectionWrapper} from '../../components/elements';
import {
  TimeSelection,
  SelectedServiceCard,
  DateSelection,
  LocationSelection,
} from '../../components/screens/Booking';

import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const BookingService = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const [servicesPrice, setServicesPrice] = useState(0);
  const [transportationFee, setTransportationFee] = useState('');
  const [isMobileLocation, setIsMobileLocation] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedServices, setSelectedServices] = useState(
    route.params.selectedServices,
  );
  const [imageList, setImageList] = useState([]);
  console.log(selectedServices);
  useEffect(() => {
    let calculatedPrice = 0;
    selectedServices.forEach(
      item =>
        (calculatedPrice += parseFloat(
          item.discountedPrice ? item.discountedPrice : item.price,
        )),
    );
    setServicesPrice(parseFloat(calculatedPrice.toFixed(2)));
  }, [selectedServices]);

  const getBookingMainData = useQuery({
    queryKey: ['GetBookingMainData'],
    queryFn: async () =>
      await axios.get('/booking', {
        params: {
          beautician_id: route.params.professionalId,
          variations: route.params.selectedServices
            .map(item => item.variationId)
            .toString(),
        },
      }),
    onSuccess: data => setSelectedAddress(data.beautician.location.address),
    onError: () => goBack(),
    keepPreviousData: false,
  });

  const getDateTimes = useQuery({
    queryKey: ['GetDateTimes', selectedDate],
    queryFn: async () =>
      await axios.get('/booking/times', {
        params: {
          session: getBookingMainData.data.session,
          date: selectedDate,
        },
      }),
    enabled: selectedDate !== '',
    keepPreviousData: false,
  });

  const getTransportationFee = useQuery({
    queryKey: ['GetTransportationFee', selectedAddress],
    queryFn: async () =>
      await axios.get('/booking/transportation_fee', {
        params: {
          session: getBookingMainData.data.session,
          date: selectedDate,
          time: selectedTime,
          address: selectedAddress,
        },
      }),
    onSuccess: data => setTransportationFee(parseFloat(data)),
    enabled:
      selectedDate !== '' &&
      selectedTime !== '' &&
      selectedAddress !== '' &&
      isMobileLocation,
    keepPreviousData: false,
  });

  const DeleteSelectedService = item => {
    let tempList = [...selectedServices];
    var filteredList = tempList.filter(
      p => p.serviceId !== item.serviceId && p.variationId !== item.variationId,
    );
    setSelectedServices(filteredList);
  };

  const addAttachmentsImages = photos => {
    setImageList(photos);
  };

  return getBookingMainData.isLoading || getBookingMainData.isFetching ? (
    <LoadingScreenLayout />
  ) : (
    <SafeAreaView style={tw`flex flex-1 bg-background`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionWrapper
          title="Location"
          titleStyle={tw`bv-heading-lg px-5`}
          contentStyle={tw`px-5`}
          style={tw`mb-4 min-h-78 py-8 flex-1 bg-white `}
          seperator={false}>
          <LocationSelection
            professionalLocation={getBookingMainData.data.beautician.location}
            onProviderLocationPress={() => {
              setIsMobileLocation(false);
              setSelectedAddress(
                getBookingMainData.data.beautician.location.address,
              );
            }}
            onMyLocationSubmit={val => {
              setIsMobileLocation(true);
              setSelectedAddress(val);
            }}
          />
        </SectionWrapper>
        <SectionWrapper
          title="Date & Time"
          //description="Show Calendar"
          titleStyle={tw`bv-heading-lg px-5`}
          contentStyle={tw`px-3`}
          style={tw`mb-4 py-4 flex-1 bg-white `}
          descriptionStyle={tw`bv-sans-sm text-primary`}
          seperator={false}
          //onDescriptionPress={() => navigate('DateSelectionModal')}
        >
          <DateSelection
            style={tw`mb-5`}
            data={getBookingMainData.data.dates}
            onPress={val => setSelectedDate(val)}
          />

          {getDateTimes.isLoading || getDateTimes.isFetching ? (
            <LoadingScreenLayout />
          ) : getDateTimes.data ? (
            <TimeSelection
              selectedDate={selectedDate}
              data={getDateTimes.data}
              onTagPress={val => setSelectedTime(val)}
            />
          ) : null}
        </SectionWrapper>

        <SectionWrapper
          title="Services"
          titleStyle={tw`bv-heading-lg px-5`}
          contentStyle={tw` px-5`}
          style={tw`mb-4 py-4 flex-1 bg-white `}>
          {selectedServices.length > 0 ? (
            selectedServices.map((item, index) => {
              return (
                <SelectedServiceCard
                  key={index}
                  title={item.serviceTitle}
                  variationTitle={item.variationTitle}
                  price={item.price}
                  discountedPrice={item.discountedPrice}
                  duration={item.duration}
                  style={tw`mb-4`}
                  seprator={selectedServices.length - 1 > index}
                  onDelete={() => DeleteSelectedService(item)}
                />
              );
            })
          ) : (
            <EmptyScreen
              style={tw`mb-4`}
              descStyle={tw`bv-med-sm`}
              description={'Please Select a Service!'}
            />
          )}
          <Button
            title={`Add ${
              selectedServices.length > 0 ? 'Another' : ''
            } Service`}
            titleStyle={tw`bv-sans-xs `}
            defaultColor={'#5948AA'}
            onPress={() => goBack()}
            icon={<AddCircle size={18} color={'#5948AA'} />}
            containerStyle={tw`justify-center`}
            style={tw`border border-basicGray rounded-10 justify-center px-1 py-2 h-auto w-full `}
          />
        </SectionWrapper>

        <SectionWrapper
          title="Add A Note/Attach Photos (Optional)"
          titleStyle={tw`bv-heading-base text-black px-5`}
          contentStyle={tw`px-5 pb-5 flex-1`}
          style={tw`mb-70 py-4 flex-1 bg-white `}
          descriptionStyle={tw`bv-sans-sm text-primary`}
          seperator={false}>
          <Input
            inputType={'textArea'}
            style={tw`min-h-35 p-2 w-auto items-start`}
            isMultiline
            maxLength={150}
            placeholder={
              'Example: I like my service to be the attached photo...'
            }
          />
          <PhotoPicker
            style={tw`mt-4`}
            buttonTheme={2}
            chooseable
            onAddPhoto={addAttachmentsImages}
          />
        </SectionWrapper>
      </ScrollView>
      <Footer
        type="swipeable"
        swipeableClosedItems={
          selectedServices.length > 0 ? (
            <View style={tw`w-full`}>
              <View style={tw`flex-row justify-between mb-3`}>
                <Text style={tw`bv-med-sm`}>Selected:</Text>
                <Text style={tw`bv-sans-sm`}>
                  {selectedServices.length +
                    ` item${
                      selectedServices.length > 1 ? 's' : ''
                    } | $${servicesPrice}`}
                </Text>
              </View>
              {transportationFee !== '' ? (
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`bv-med-sm`}>Transportation Fee:</Text>
                  <Text style={tw`bv-sans-sm`}>{`$ ${transportationFee}`}</Text>
                </View>
              ) : null}
              <View style={tw`flex-row justify-between mb-3`}>
                <Text style={tw`bv-med-sm`}>Total:</Text>
                <Text style={tw`bv-sans-sm`}>
                  {`$ ${servicesPrice + transportationFee}`}
                </Text>
              </View>
              <View style={tw`h-0.25 w-full bg-black opacity-10 mt-1.5 mb-3`} />
            </View>
          ) : null
        }
        // swipeableOpenedItems={
        //   creditBalance || membership ? (
        //     <View style={tw`w-full`}>
        //       {creditBalance ? (
        //         <View style={tw`flex-row justify-between mb-4`}>
        //           <Text style={tw`bv-med-sm`}>Credit Balance:</Text>
        //           <View style={tw`flex-row`}>
        //             <Text style={tw`bv-sans-sm`}>{creditBalance}</Text>
        //             <Text style={tw`bv-sans-sm text-grayBorder mx-2`}>|</Text>
        //             <Text style={tw`bv-sans-sm`}>{creditBalanceCost}</Text>
        //           </View>
        //         </View>
        //       ) : null}
        //       {membership ? (
        //         <View style={tw`flex-row justify-between mb-4`}>
        //           <Text style={tw`bv-med-sm`}>Membership:</Text>
        //           <Text style={tw`bv-sans-sm`}>{membership}</Text>
        //         </View>
        //       ) : null}
        //     </View>
        //   ) : null
        // }
        style={tw`bg-white shadow-md px-7`}
        swipeableButtonAvailable
        firstButtonTitle="Book Now"
        swipeableButtonType="primary"
        onPressFirstButton={() =>
          navigate('Booking', {
            screen: 'Checkout',
            params: {
              session: getBookingMainData.data.session,
              beautician: getBookingMainData.data.beautician,
              selectedServices: selectedServices,
              selectedDate: selectedDate,
              selectedAddress: selectedAddress,
              selectedTime: selectedTime,
              transportationFee: transportationFee,
              servicesPrice: servicesPrice,
              where: isMobileLocation ? 'mobile' : 'studio',
              attachments: imageList,
            },
          })
        }
        firstButtonDisabled={
          selectedServices.length === 0 ||
          selectedDate === '' ||
          selectedTime === '' ||
          selectedAddress === ''
        }
      />
    </SafeAreaView>
  );
};

export default BookingService;
