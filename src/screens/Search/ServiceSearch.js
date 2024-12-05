import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Clock, Location, SearchNormal, Notepad2} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {SearchCard} from '../../components/screens/Search';
import {
  TimeSearchCard,
  LocationSearchCard,
  ServiceSearchCard,
  SearchScreenTabBar,
} from '../../components/screens/Search';
import {Footer} from '../../components/elements';
import axios from 'axios';
import {useQuery} from 'react-query';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';
import dayjs from 'dayjs';

const ServiceSearch = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const [actvieIndex, setActvieIndex] = useState(1);
  const [actvieCategory, setActvieCategory] = useState(
    route.params ? route.params.activeCategoryId : null,
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchOptions, setSearchOptions] = useState({});

  const getPopularCategories = useQuery({
    queryFn: () => {
      return axios.get('/categories/popular');
    },
    onError: () => goBack(),
  });

  const onSearchCardPress = id => {
    setActvieIndex(id);
  };
  const onChangeSearchOptions = options => {
    let tempList = {...searchOptions};
    tempList = {...tempList, ...options};

    setSearchOptions(tempList);
  };
  const clearSearchOptions = () => {
    setActvieIndex(1);
    setSearchOptions({});
    setSelectedCategory('');
    setSelectedAddress('');
    setSelectedTime('');
    setActvieCategory(null);
  };

  return (
    <SafeAreaView style={tw`pt-5 flex-1`}>
      {getPopularCategories.isFetching || getPopularCategories.isLoading ? (
        <LoadingScreenLayout style={tw`bg-background flex-1`} />
      ) : (
        <ScrollView style={tw`px-5`} showsVerticalScrollIndicator={false}>
          <SearchScreenTabBar style={tw`mb-5`} />
          <SearchCard
            key={1}
            title={selectedCategory ? selectedCategory : 'What?'}
            description=""
            style={tw`mb-4`}
            icon={<Notepad2 size={18} color="#414141" />}
            component={ServiceSearchCard}
            onPress={() => onSearchCardPress(1)}
            isActive={actvieIndex === 1}
            propsList={{
              style: tw`mb-4`,
              activeCategoryId: actvieCategory,
              data: getPopularCategories.data,
              onSubmit: (serviceSearchOptions, isSelected) => {
                onChangeSearchOptions(serviceSearchOptions);
                setSelectedCategory(serviceSearchOptions.title);
                isSelected ? setActvieIndex(2) : null;
              },
            }}
          />
          <SearchCard
            key={2}
            title={selectedAddress ? selectedAddress : 'Where?'}
            description={selectedAddress ? null : 'My Location'}
            style={tw`mb-4`}
            icon={<Location size={18} color="#414141" />}
            component={LocationSearchCard}
            propsList={{
              title: 'Where do you want to get the service?',
              style: tw`mb-4`,
              onSubmit: (locationSearchOptions, isSelected) => {
                onChangeSearchOptions(locationSearchOptions);
                setSelectedAddress(locationSearchOptions.address);
                isSelected ? setActvieIndex(3) : null;
              },
            }}
            onPress={() => onSearchCardPress(2)}
            isActive={actvieIndex === 2}
          />
          <SearchCard
            key={3}
            title={selectedTime ? selectedTime : 'When?'}
            style={tw`mb-4`}
            description="Any Time"
            icon={<Clock size={18} color="#414141" />}
            component={TimeSearchCard}
            propsList={{
              title: 'When do you want to get the service?',
              style: tw`mb-20`,
              onSubmit: timeSearchOptions => {
                onChangeSearchOptions(timeSearchOptions);
                setSelectedTime(
                  dayjs(timeSearchOptions.date_from).format('DD MMMM') +
                    ' - ' +
                    dayjs(timeSearchOptions.date_to).format('DD MMMM'),
                );
              },
            }}
            onPress={() => onSearchCardPress(3)}
            isActive={actvieIndex === 3}
          />
        </ScrollView>
      )}
      <Footer
        style={tw`bg-white px-5 rounded-t-15`}
        twoButton
        firstButtonIcon={
          <SearchNormal size={24} color="#FFFFFF" style={tw`mr-3`} />
        }
        firstButtonTitle="Search"
        secondButtonTitle="Clear"
        onPressFirstButton={() => {
          navigate('Search', {
            screen: 'SearchResult',
            params: {searchOptions: searchOptions},
          });
        }}
        onPressSecondButton={() => clearSearchOptions()}
      />
    </SafeAreaView>
  );
};

export default ServiceSearch;
