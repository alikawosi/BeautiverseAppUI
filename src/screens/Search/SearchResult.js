import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Map1} from 'iconsax-react-native';
import {useInfiniteQuery} from 'react-query';

import tw from '../../../tailwind';
import {Button, EmptyScreen} from '../../components/commons';
import {
  FilterBar,
  SortBar,
  ServiceCard,
} from '../../components/screens/SearchResult';
import {ServiceCardData} from '../../constants';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';
import {api} from '../../utils';
const width = Dimensions.get('window').width;

const instance = api.instanse();

const SearchResult = ({route}) => {
  const {navigate} = useNavigation();
  const [searchOptions, setSearchoptions] = useState(
    route.params.searchOptions,
  );
  const [refreshing, setRefresh] = useState(false);

  const {
    data,
    hasNextPage,
    refetch,
    isRefetching,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery(
    ['GetSearchResults', searchOptions],
    async ({pageParam = 1}) => {
      const response = await instance.get('/search', {
        params: {
          ...searchOptions,
          page_number: pageParam,
        },
      });

      return {
        data: response.data,
        nextPageParam: response.headers['x-next-page'] || null,
      };
    },
    {
      getNextPageParam: lastPage => lastPage.nextPageParam,
    },
  );

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const onRefresh = () => {
    refetch({
      refetchPage: (_, index) => index === 0,
    });

    setRefresh(true);
  };

  useEffect(() => {
    if (refreshing && !isRefetching) {
      setRefresh(false);
    }
  }, [isRefetching, refreshing]);

  const renderServiceCard = ({item, index}) => {
    return (
      <ServiceCard
        onPress={() =>
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {professionalId: item.id},
          })
        }
        style={tw.style({
          'mt-4 pt-4 border-t border-gray-200': index >= 1,
        })}
        carouselWidth={width - 20}
        showFavorite={false}
        carouselHeight={width * 0.61}
        key={item.id}
        name={item.title}
        image={item.img.url}
        imageList={ServiceCardData[0].imageList}
        isVerify={item.verified}
        isMaestro={item.maestro}
        tabBarData={item.categories}
        numberOfCustomer={item.apps}
        isAvailable={item.is_available}
        address={item.location.address}
        satisfactionPercentage={item.rtns}
        offerList={item.categories[0].variations}
      />
    );
  };

  const searchResult = data?.pages?.flatMap(page => page.data);
  const beauticianData = searchResult?.flatMap(item => item.beauticians);

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <View style={tw`pt-5`}>
        <FilterBar
          searchOptions={searchOptions}
          style={tw`px-5 shadow`}
          serviceName={
            route.params.searchOptions.title
              ? route.params.searchOptions.title
              : 'Any services'
          }
          location={
            route.params.searchOptions.address
              ? route.params.searchOptions.address
              : 'any where'
          }
          time={
            route.params.searchOptions.date_from
              ? route.params.searchOptions.date_type
              : 'any time'
          }
          onSubmitModal={filteredSearchOptions => {
            let updatedSearchOptions = {
              ...searchOptions,
              ...filteredSearchOptions,
            };
            setSearchoptions(updatedSearchOptions);
          }}
        />
        <SortBar setSearchoptions={setSearchoptions} style={tw`my-3 px-5`} />
      </View>
      <View style={tw`rounded-t-20 bg-white flex-1 relative items-center`}>
        {isLoading ? (
          <LoadingScreenLayout style={tw`bg-transparent`} />
        ) : beauticianData?.length ? (
          <>
            <View style={tw`flex-grow`}>
              <FlatList
                refreshing={refreshing}
                data={beauticianData}
                ListFooterComponent={
                  isFetching && (
                    <ActivityIndicator
                      color={'#5948AA'}
                      style={tw`mt-8`}
                      size={25}
                    />
                  )
                }
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                contentContainerStyle={tw`flex-grow px-5 pt-5 pb-22`}
                renderItem={item => renderServiceCard(item)}
                keyExtractor={(item, index) => String(item.id || index)}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
              />
            </View>
            {Boolean(beauticianData?.length) && (
              <Button
                title={'View On Map'}
                containerStyle={tw`z-50 absolute bottom-5`}
                style={tw`bg-[#222433] rounded-10 w-42.25 self-center px-4 py-2.5 h-auto shadow-xl`}
                titleStyle={tw`bv-heading-sm`}
                defaultColor={'#FFFFFF'}
                onPress={() =>
                  navigate('MapSearchResult', {
                    searchOptions: searchOptions,
                    searchData: searchResult,
                  })
                }
                reverse
                icon={<Map1 size={20} color={'#FFFFFF'} variant="Bold" />}
              />
            )}
          </>
        ) : (
          <EmptyScreen
            style={tw`my-auto bg-transparent`}
            description={'No suitable Result! Change your filters!'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
