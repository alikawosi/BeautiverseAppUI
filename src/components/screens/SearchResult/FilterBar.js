import React, {useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Shop, Clock, Filter} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {FilterModalData} from '../../../constants';

const FilterBar = ({
  serviceName,
  location,
  time,
  searchOptions,
  onSubmitModal = () => false,
  style,
}) => {
  const defaultValue = useRef({
    gender: FilterModalData[0].options.find(
      ({value}) => value === searchOptions.gender,
    ),
  });
  const {navigate, goBack} = useNavigation();

  return (
    <Pressable
      onPress={() => goBack()}
      style={tw.style(
        'mx-5 h-20 flex-row justify-between rounded-2xl py-3 pr-4 pl-5 bg-white ',
        style,
      )}>
      <View style={tw`flex justify-around`}>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`bv-sans-sm text-primary`}>{serviceName}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-row items-center mr-1`}>
            <Shop size={16} color="#717171" style={tw`mr-1`} />
            <Text style={tw`bv-sans-sm text-grayBorder `}>
              {location.length > 21 ? location.slice(0, 20) + ' ...' : location}
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Clock size={16} color="#717171" style={tw`mr-1`} />
            <Text style={tw`bv-sans-sm text-grayBorder`}>{time}</Text>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() =>
          navigate('FilterModal', {
            title: 'Filters',
            defaultValue,
            initialSearchOptions: searchOptions,
            onSubmit: filteredList => {
              onSubmitModal(filteredList);
            },
          })
        }
        style={tw`justify-center p-2 items-center`}>
        <Filter size={26} color="#BAB9B9" />
      </Pressable>
    </Pressable>
  );
};

export {FilterBar};
