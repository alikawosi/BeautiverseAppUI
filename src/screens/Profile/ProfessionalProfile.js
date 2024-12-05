import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  Details,
  InfoCard,
  ProfessionalInfo,
  ProfileCarousel,
  Services,
} from '../../components/screens/Profile';
import {Footer} from '../../components/elements';
import {AboutProfessionalData} from '../../constants';
import {TabBar, TabBarItem} from '../../components/commons';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const ProfessionalProfile = ({}) => {
  const {professionalId} = useRoute().params;
  const {navigate, goBack} = useNavigation();
  //const userPosition = useAuth().state.position.coords;
  const [isFavorite, setIsFavorite] = useState(false);
  const [payablePrice, setPayablePrice] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const getBeauticianMainData = useQuery({
    queryFn: async () =>
      await axios.get('/beautician/single', {
        params: {
          id: professionalId,
          //user_coords_lat: userPosition.latitude,
          //user_coords_lng: userPosition.longitude,
        },
      }),
    queryKey: ['GetBeauticianMainData'],
    onSuccess: data => setIsFavorite(data.is_favorite),
    onError: () => goBack(),
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  });
  const getBeauticianServices = useQuery({
    queryKey: ['GetBeauticianServices'],
    queryFn: async () =>
      await axios.get('/beautician/single/services', {
        params: {
          id: professionalId,
        },
      }),
    onError: () => goBack(),
    refetchOnWindowFocus: false,
  });
  const getBeauticianLocation = useQuery({
    queryKey: ['GetBeauticianDetailsLocation'],
    queryFn: async () =>
      await axios.get('/beautician/single/details/location', {
        params: {
          id: professionalId,
        },
      }),
    onError: () => goBack(),
    refetchOnWindowFocus: false,
  });
  const getBeauticianRules = useQuery({
    queryKey: ['GetBeauticianRules'],
    queryFn: async () =>
      await axios.get('/beautician/single/details/rules', {
        params: {
          id: professionalId,
        },
      }),
    onError: () => goBack(),
    refetchOnWindowFocus: false,
  });
  const getBeauticianWorkHours = useQuery({
    queryKey: ['GetBeauticianWorkHours'],
    queryFn: async () =>
      await axios.get('/beautician/single/details/times', {
        params: {
          id: professionalId,
        },
      }),
    onError: () => goBack(),
    refetchOnWindowFocus: false,
  });
  const toggleFavoriteProfessional = useMutation({
    mutationFn: () => {
      axios.post('/user/favorite', {
        beautician_id: professionalId,
      });
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (selectedServices.length > 0) {
      let calculatedPrice = 0;
      selectedServices.forEach(
        item =>
          (calculatedPrice += parseFloat(
            item.discountedPrice ? item.discountedPrice : item.price,
          )),
      );
      setPayablePrice(calculatedPrice.toFixed(2));
    } else {
    }
  }, [selectedServices]);

  return getBeauticianMainData.isLoading ||
    getBeauticianMainData.isFetching ||
    getBeauticianServices.isLoading ||
    getBeauticianServices.isFetching ||
    getBeauticianLocation.isLoading ||
    getBeauticianLocation.isFetching ? (
    <LoadingScreenLayout />
  ) : (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCarousel
          professionalId={getBeauticianMainData.data.id}
          imageList={
            getBeauticianMainData.data.gallery
              ? getBeauticianMainData.data.gallery.filter(
                  item => typeof item.url !== 'boolean',
                )
              : []
          }
          isFavorite={isFavorite}
          url={getBeauticianMainData.data.permalink}
          onPressFavorite={() => {
            toggleFavoriteProfessional.mutate();
          }}
        />
        <View style={tw`px-5`}>
          <ProfessionalInfo
            name={getBeauticianMainData.data.title}
            image={getBeauticianMainData.data.img.url}
            address={getBeauticianMainData.data.location.address}
            isMaestro={getBeauticianMainData.data.maestro}
            isVerify={getBeauticianMainData.data.verified}
            rate={getBeauticianMainData.data.rate}
            review={getBeauticianMainData.data.count_rates}
            distance={getBeauticianMainData.data.distance}
            latitude={getBeauticianLocation.data.location.lat}
            longitude={getBeauticianLocation.data.location.lng}
          />
          <InfoCard
            availableTime={getBeauticianMainData.data.time_text}
            consultation={getBeauticianMainData.data.consultation}
            inAppPayment={getBeauticianMainData.data.app_payment}
            instantBooking={getBeauticianMainData.data.instant_booking}
            data={AboutProfessionalData}
            desc={getBeauticianMainData.data.description}
          />
          <TabBar
            style={tw`bg-[#F2F3F6]`}
            itemStyle={tw`rounded-15`}
            textStyle={tw`text-base`}
            deactiveColor="#717171">
            <TabBarItem
              style={tw`mb-34`}
              options={{
                title: 'Services',
              }}>
              <Services
                data={getBeauticianServices.data}
                initialValues={selectedServices}
                onChange={val => {
                  //console.log(val);
                  setSelectedServices(val);
                }}
              />
            </TabBarItem>
            <TabBarItem
              style={tw`mb-34 flex-1`}
              options={{
                title: 'Info',
              }}>
              <Details
                locationData={getBeauticianLocation.data}
                rulesAndPolicyData={getBeauticianRules.data}
                workHoursData={getBeauticianWorkHours.data}
              />
            </TabBarItem>
            {/* <TabBarItem
              style={tw`mb-34`}
              options={{
                title: 'Reviews',
              }}>
              <Reviews />
            </TabBarItem> */}
          </TabBar>
        </View>
      </ScrollView>
      <Footer
        type="swipeable"
        firstButtonDisabled={selectedServices.length === 0}
        swipeableClosedItems={
          selectedServices.length > 0 ? (
            <View style={tw`w-full`}>
              <View style={tw`flex-row justify-between mb-3`}>
                <Text style={tw`bv-med-sm`}>Selected:</Text>
                <Text style={tw`bv-sans-sm`}>
                  {selectedServices.length +
                    ` item${
                      selectedServices.length > 1 ? 's' : ''
                    }| $${payablePrice}`}
                </Text>
              </View>
              {/* <View style={tw`flex-row justify-between`}>
                <Text style={tw`bv-med-sm`}>Transportation Fee:</Text>
                <Text style={tw`bv-sans-sm`}>{transportationFee}</Text>
              </View> */}
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
        style={tw`bg-white  px-7`}
        swipeableButtonAvailable
        firstButtonTitle="Book Now"
        secondButtonTitle="Subscrube"
        onPressFirstButton={() =>
          navigate('Booking', {
            screen: 'BookingService',
            params: {
              professionalId: professionalId,
              selectedServices: selectedServices,
            },
          })
        }
        swipeableButtonType="primary"
        // onPressSecondButton={() => {
        //   navigate('Subscribe', {
        //     screen: 'ServiceSubscribe',
        //     params: {
        //       profileInfo: getBeauticianMainData.data,
        //       selectedServices: null,
        //     },
        //   });
        // }}
      />
    </SafeAreaView>
  );
};

export default ProfessionalProfile;
