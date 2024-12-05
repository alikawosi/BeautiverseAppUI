import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import axios from 'axios';
import {SearchNormal} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Input, ModalWrapper} from '../commons';
import {SearchResultCard} from '../screens/Search';
import LoadingScreenLayout from '../commons/LoadingScreenLayout';

const SearchModal = ({route}) => {
  const {title, placeholder, type, onClose, onSubmit} = route.params;
  const {navigate, goBack} = useNavigation();
  const [results, setResults] = useState([]);
  const [searchedText, setSearchedText] = useState(null);

  const getSearchResult = useQuery({
    queryKey: ['getCategoryResults', searchedText],
    enabled: searchedText !== null,
    queryFn: () =>
      type === 'beautician'
        ? axios.get('/beauticians/search', {params: {title: searchedText}})
        : type === 'location'
        ? axios.get(
            'https://beautiverse.ca/api/beautiverse/location/predict_address',
            {
              params: {address: searchedText},
            },
          )
        : axios.get('/categories/search', {params: {title: searchedText}}),
    onSuccess: res => {
      res.services ? setResults(res.services) : setResults(res);
    },
  });

  const renderOption = (item, index) => {
    if (type === 'beautician') {
      return (
        <SearchResultCard
          id={item.id}
          title={item.title}
          location={item.location.address}
          image={item.img}
          isVerified={item.verified}
          beauticianFlag
          onPress={() => {
            goBack();
            navigate('Profile', {
              screen: 'ProfessionalProfile',
              params: {professionalId: item.id},
            });
          }}
        />
      );
    } else {
      return (
        <SearchResultCard
          id={item.id ? item.id : index}
          title={item.title ? item.title : item}
          serviceFlag={item.id ? true : false}
          onPress={selectedItem => {
            onSubmit(selectedItem);
            goBack();
          }}
        />
      );
    }
  };

  return (
    <ModalWrapper
      type="fromBottom"
      onClose={onClose}
      style={tw` h-7/8 bg-white rounded-3xl p-6`}>
      <View style={tw`flex-row justify-between mb-4`}>
        <Text style={tw` bv-heading-base text-primary`}>{title}</Text>
      </View>
      <Input
        placeholder={placeholder}
        textInputStyle={tw`w-12/13 `}
        onChange={text => setSearchedText(text)}
        style={tw`border-primary mb-5`}
        preffix={<SearchNormal size={22} color="#5948AA" style={tw`mr-1`} />}
      />
      {getSearchResult.isLoading || getSearchResult.isFetching ? (
        <LoadingScreenLayout />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          ItemSeparatorComponent={() => (
            <View
              style={tw.style('my-2  w-full', {
                'h-0.25 bg-lightGray my-4': type === 'beautician',
              })}
            />
          )}
          renderItem={({item}, index) => renderOption(item)}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </ModalWrapper>
  );
};

export {SearchModal};
