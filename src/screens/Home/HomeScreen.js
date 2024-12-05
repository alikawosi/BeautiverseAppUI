import React from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {
  ErrorScreenLayout,
  PaginationCarousel,
  SectionCarousel,
} from '../../components/commons';
import {
  CategoryCard,
  ProfessionalImageCard,
  ProfessionalCard,
} from '../../components/elements';
import {ServiceCardData} from '../../constants';
import {SearchBar} from '../../components/screens/Home';
import {ServiceCard} from '../../components/screens/SearchResult';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const HomeScreen = () => {
  const {navigate} = useNavigation();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['GetHome'],
    queryFn: async () => await axios.get('/home'),
  });

  return (
    <>
      <SearchBar containerStyle={tw`bg-background `} />
      {isLoading ? (
        <LoadingScreenLayout style={tw`bg-background`} />
      ) : isError ? (
        <ErrorScreenLayout
          style={tw`flex-1 bg-background `}
          description={'Somethong Wrong Happened! Please try again later'}
        />
      ) : (
        <SafeAreaView edges={['top']} style={tw`flex-1`}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <PaginationCarousel style={tw`mb-9`} data={data.sliders} />
            <SectionCarousel
              style={tw`bg-white mb-4 py-5`}
              sectionTitle="Popular Categories"
              headerStyle={'px-5 mb-5'}
              bodyStyle={tw`px-5`}
              linkLabel="Show All"
              onLinkPress={() =>
                navigate('PopularCategories', {
                  data: data.categories,
                })
              }
              data={data.categories}
              renderOption={({item}) => (
                <CategoryCard
                  onPress={() =>
                    navigate('Search', {
                      screen: 'ServiceSearch',
                      params: {
                        activeCategoryId: item.id,
                      },
                    })
                  }
                  title={item.title}
                  image={item.cover.url}
                />
              )}
            />
            <SectionCarousel
              sectionTitle="Offers & Promotions"
              style={tw`bg-white py-6 mb-4`}
              headerStyle={'px-5 mb-5'}
              bodyStyle={tw`px-5`}
              snapToIndex
              sepratorStyle={tw`bg-lightGray w-0.25 mx-4`}
              linkLabel="Show All"
              onLinkPress={() =>
                navigate('Search', {
                  screen: 'SearchResult',
                  params: {searchOptions: {sort: 'offers'}},
                })
              }
              data={data.offers}
              renderOption={({item}) => (
                <ServiceCard
                  key={item.id}
                  onPress={() =>
                    navigate('Profile', {
                      screen: 'ProfessionalProfile',
                      params: {professionalId: item.id},
                    })
                  }
                  name={item.title}
                  image={item.img.url}
                  showFavorite={false}
                  imageList={ServiceCardData[0].imageList}
                  isVerify={item.verified}
                  isMaestro={item.maestro}
                  tabBarData={item.categories}
                  numberOfCustomer={item.apps}
                  isAvailable={item.is_available}
                  address={item.location.address}
                  satisfactionPercentage={item.rtns}
                />
              )}
            />
            <SectionCarousel
              sectionTitle="Recommended"
              style={tw`bg-white py-5 mb-4`}
              bodyStyle={tw`px-5`}
              headerStyle={'px-5 mb-5'}
              linkLabel="Show All"
              onLinkPress={() =>
                navigate('Search', {
                  screen: 'SearchResult',
                  params: {searchOptions: {sort: 'recommended-default'}},
                })
              }
              data={data.recommended}
              renderOption={({item}) => (
                <ProfessionalImageCard
                  onPress={() =>
                    navigate('Profile', {
                      screen: 'ProfessionalProfile',
                      params: {professionalId: item.id},
                    })
                  }
                  name={item.title}
                  image={item.img.url}
                  isVerify={item.verified}
                  numberOfCustomer={item.apps}
                  address={item.location.address}
                  satisfactionPercentage={item.rtns}
                  category={item.main_category_title}
                />
              )}
            />
            <SectionCarousel
              sectionTitle="Top Rated Professionals"
              style={tw`bg-white py-3 mb-12`}
              bodyStyle={tw`pl-5 py-2`}
              headerStyle={'px-5 mb-5'}
              snapToIndex
              data={data.top_professionals}
              linkLabel="Show All"
              onLinkPress={() =>
                navigate('TopRatedProfessionals', {
                  data: data.top_professionals,
                })
              }
              renderOption={({item}) => (
                <ProfessionalCard
                  onPress={() =>
                    navigate('Profile', {
                      screen: 'ProfessionalProfile',
                      params: {professionalId: item.id},
                    })
                  }
                  style={tw`w-80 shadow-lg mb-1`}
                  name={item.title}
                  image={item.img.url}
                  tabBarData={item.categories}
                  isMaestro={item.maestro}
                  isVerify={item.verified}
                  sex={item.main_category.sex}
                  numberOfCustomer={item.apps}
                  address={item.location.address}
                  satisfactionPercentage={item.rtns}
                  isMobile={item.main_category.service_location}
                />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default HomeScreen;
