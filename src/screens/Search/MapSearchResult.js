import React, {useState} from 'react';
import {View, Image, Pressable, Dimensions} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CloseCircle, Gps, Grid8} from 'iconsax-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {FilterBar, SortBar} from '../../components/screens/SearchResult';
import {MapSearchResultCard} from '../../components/screens/Search';
import {Button} from '../../components/commons';
import {useQuery} from 'react-query';
import axios from 'axios';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapSearchResult = ({route}) => {
  const mapRef = React.createRef();
  const {goBack} = useNavigation();
  const [searchOptions, setSearchoptions] = useState(
    route.params.searchOptions,
  );
  const [searchData, setSearchData] = useState(route.params.searchData);
  const [cardInfo, setCardInfo] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  const getSearchResults = useQuery({
    queryFn: async () => await axios.get('/search', {params: searchOptions}),
    queryKey: ['GetSearchResults', searchOptions],
    onSuccess: data => setSearchData(data),
    onError: () => goBack(),
    enabled: searchOptions !== route.params.searchOptions,
  });

  const ShowCard = item => {
    if (!item) {
      setCardInfo(false);
    } else {
      setSelectedId(item.id);
      setCardInfo(
        <View style={tw`rounded-20 justify-end absolute p-3 bottom-24`}>
          <CloseCircle
            size={28}
            color="#717171"
            variant="Bold"
            onPress={() => ShowCard()}
          />
          <MapSearchResultCard
            id={item.id}
            image={
              item.img.url
                ? {uri: item.img.url}
                : require('../../assets/media/UserDefault.png')
            }
            name={item.title}
            category={item.categories[0].title}
            isUnisex={item.categories[0].sex}
            isVerify={item.verified}
            address={item.location.address}
            isMobile={item.isMobile}
            numberOfCustomer={item.apps}
            satisfactionPercentage={item.rtns}
            style={tw`w-full`}
          />
        </View>,
      );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`} forceInset={{top: 'always'}}>
      {getSearchResults.isLoading || getSearchResults.isFetching ? (
        <LoadingScreenLayout style={tw`bg-background`} />
      ) : (
        <View style={tw`relative`}>
          <MapView
            loadingIndicatorColor="blue"
            loadingBackgroundColor="red"
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={tw`h-full w-full`}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            showsPointsOfInterest={true}
            showsCompass={false}
            initialRegion={{
              latitude: searchData.beauticians[0].location.lat,
              longitude: searchData.beauticians[0].location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {searchData.beauticians.map(item => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                }}
                onPress={() => ShowCard(item)}>
                <Pressable style={tw`border-primary items-center  z-5`}>
                  <Image
                    style={tw.style('h-15 w-12 ', {
                      'h-14 w-14': item.id === selectedId,
                    })}
                    resizeMode="contain"
                    source={
                      selectedId === item.id
                        ? require('../../assets/media/SelectedMapMarker.png')
                        : require('../../assets/media/MapMarker.png')
                    }
                  />
                  <View style={tw`absolute bottom-0 p-4`}>
                    <Image
                      style={tw.style('h-10 w-10 rounded-full ', {
                        'h-7 w-7': item.id === selectedId,
                      })}
                      resizeMode="contain"
                      source={
                        item.img.url
                          ? {uri: item.img.url}
                          : require('../../assets/media/UserDefault.png')
                      }
                    />
                  </View>
                </Pressable>
              </Marker>
            ))}
          </MapView>
          <Pressable
            style={tw.style(
              'rounded-20 absolute p-3 bottom-10  right-2 shadow-lg bg-white ',
              {'bottom-54': cardInfo},
            )}>
            <Gps size={32} color="#5948AA" />
          </Pressable>
        </View>
      )}
      <View style={tw`shadow-md absolute left-0 right-0 top-10`}>
        <FilterBar
          searchOptions={searchOptions}
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
        <SortBar style={tw`mt-3`} setSearchoptions={setSearchoptions} />
      </View>
      {cardInfo}
      <Button
        title={'View Results List'}
        style={tw`bg-[#222433] absolute bottom-11 rounded-10 w-42.25 self-center px-4 py-2.5 h-auto shadow-xl`}
        titleStyle={tw`bv-heading-sm`}
        defaultColor={'#FFFFFF'}
        onPress={() => goBack()}
        reverse
        icon={<Grid8 size={20} color={'#FFFFFF'} variant="Bold" />}
      />
    </SafeAreaView>
  );
};

export default MapSearchResult;
