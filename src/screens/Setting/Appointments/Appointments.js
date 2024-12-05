import React from 'react';
import axios from 'axios';
import {View, Text, ScrollView} from 'react-native';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {EmptyScreen} from '../../../components/commons';
import {AppointmentCard} from '../../../components/screens/Appointment';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const Appointments = () => {
  const {navigate, goBack} = useNavigation();

  const getUpcomingAppointments = useQuery({
    queryFn: () => axios.get('/appointments/upcoming'),
    onSuccess: data => console.log(Object.values(data)),
    onError: () => goBack(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const getBookAgainAppointments = useQuery({
    queryFn: () => axios.get('/appointments/book_again'),
    onError: () => goBack(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });
  return getUpcomingAppointments.isLoading ||
    getUpcomingAppointments.isFetching ||
    getBookAgainAppointments.isLoading ||
    getBookAgainAppointments.isFetching ? (
    <LoadingScreenLayout style={tw`flex-1 bg-background`} />
  ) : (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex flex-1 bg-background pb-4  items-center `}>
      {Object.values(getUpcomingAppointments.data).length === 0 &&
      getBookAgainAppointments.data.length === 0 ? (
        <EmptyScreen
          style={tw`flex-1 bg-background`}
          description={'you have no appointment yet...'}
        />
      ) : (
        <ScrollView style={tw` `} showsVerticalScrollIndicator={false}>
          {Object.values(getUpcomingAppointments.data).length > 0 ? (
            <View style={tw``}>
              <Text style={tw`bv-heading-lg mb-4 ml-4`}>Upcoming</Text>
              {Object.values(getUpcomingAppointments.data).map(item => {
                return (
                  <AppointmentCard
                    style={tw`w-auto rounded-2xl mb-2 p-7 `}
                    isUpcoming
                    name={item.beautician.title}
                    image={item.beautician.img.url}
                    address={item.beautician.location.address}
                    isVerify={item.beautician.verified}
                    isMaestro={item.beautician.maestro}
                    dueDate={item.app_detail.book_date}
                    time={item.app_detail.book_time}
                    offerTitle={
                      item.app_detail.variations[0].service_name +
                      ' | ' +
                      item.app_detail.variations[0].variation_name
                    }
                    duration={item.app_detail.variations[0].duration}
                    oldPrice={item.app_detail.variations[0].variation_price}
                    newPrice={
                      item.app_detail.variations[0].variation_sale_price
                    }
                  />
                );
              })}
            </View>
          ) : null}
          {getBookAgainAppointments.data.length > 0 ? (
            <View>
              <Text style={tw`bv-heading-lg mb-4`}>History</Text>
              {getBookAgainAppointments.data.map(item => {
                return (
                  <AppointmentCard
                    style={tw`w-auto bg-red-200 border-b mb-4`}
                    {...item}
                  />
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Appointments;
