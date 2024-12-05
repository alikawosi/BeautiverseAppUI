import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {EmptyScreen, SectionCarousel} from '../../components/commons';
import {SearchBar} from '../../components/screens/Home';
import {AppointmentCard} from '../../components/screens/Appointment';

import {ProfessionalCard} from '../../components/elements';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const AppointmentScreen = () => {
  const {goBack, navigate, addListener} = useNavigation();
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getAppointments.refetch();
    });
    return unsubscribe;
  }, [getAppointments, addListener]);

  const getAppointments = useQuery({
    queryFn: async () => await axios.get('/appointments'),
    onError: () => goBack(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });
  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-background `}>
      <SearchBar style={tw`mb-5`} />
      {getAppointments.isLoading || getAppointments.isFetching ? (
        <LoadingScreenLayout style={tw`bg-background`} />
      ) : getAppointments.data?.upcoming?.length === 0 &&
        getAppointments.data?.book_again?.length === 0 &&
        getAppointments.data?.favorites?.length === 0 ? (
        <EmptyScreen
          style={tw`bg-background justify-center items-center flex-1`}
          description={'No Apooinments booked Yet! Try one!'}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {getAppointments.data?.upcoming?.length > 0 ? (
            <SectionCarousel
              sectionTitle="Upcoming Apps"
              style={tw`flex-1`}
              headerStyle={'px-5 mb-3'}
              bodyStyle={'px-5'}
              linkLabel="Show All"
              onLinkPress={() =>
                navigate('Appointment', {screen: 'Appointments'})
              }
              data={getAppointments.data?.upcoming.map(
                item => item.appointments,
              )}
              renderOption={p => {
                if (p.item) {
                  return p.item.map(item => (
                    <AppointmentCard
                      style={tw`mr-2`}
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
                  ));
                }
              }}
              //isTabBarEnable={true}
              //tabBarData={APPOINTMENT_CONST.UnderLineTabBarData}
            />
          ) : null}

          {getAppointments.data?.book_again?.length > 0 ? (
            <SectionCarousel
              sectionTitle="Book Again"
              headerStyle={'px-5 mb-3'}
              bodyStyle={'pl-5'}
              data={getAppointments.data?.book_again.map(
                item => item.appointments,
              )}
              renderOption={p => {
                if (p.item) {
                  return p.item.map(item => (
                    <AppointmentCard
                      style={tw`mr-2`}
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
                  ));
                }
              }}
              // isTabBarEnable={true}
              // tabBarData={APPOINTMENT_CONST.UnderLineTabBarData}
            />
          ) : null}

          {/* <SectionCarousel
          sectionTitle="Subscriptions"
          headerStyle={'px-5'}
          linkLabel="Show All"
          onLinkPress={() => navigate('Subscriptions')}
          data={SubscriptionCardData}
          renderOption={({item}) => <SubscriptionCard {...item} />}
        /> */}
          {getAppointments.data?.favorites?.length > 0 ? (
            <SectionCarousel
              sectionTitle="Favorites"
              headerStyle={'px-5 mb-3'}
              bodyStyle={'pl-5'}
              linkLabel="Show All"
              onLinkPress={() => navigate('Appointment', {screen: 'Favorites'})}
              data={getAppointments.data.favorites}
              renderOption={({item}) => (
                <ProfessionalCard
                  onPress={() =>
                    navigate('Profile', {
                      screen: 'ProfessionalProfile',
                      params: {
                        professionalId: item.id,
                      },
                    })
                  }
                  style={tw`w-80`}
                  isFavorite
                  name={item.title}
                  image={item.img?.url}
                  tabBarData={item.categories}
                  isMaestro={item.maestro}
                  isVerify={item.verified}
                  //sex={item.main_category.sex}
                  numberOfCustomer={item.apps}
                  address={item.location?.address}
                  satisfactionPercentage={item.rtns}
                  // isMobile={
                  //   item.service_location === ('anywhere' || 'mobile') ? true : false
                  // }
                />
              )}
            />
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AppointmentScreen;
