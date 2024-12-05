import React, {useEffect, useRef, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {SearchNormal} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {GenderSelect} from './GenderSelect';
import {InputWrapper} from '../../../components/commons';
import {CategoryCard} from '../../../components/elements';
import Animated, {Easing, FadeInUp} from 'react-native-reanimated';

const ServiceSearchCard = ({
  style,
  activeCategoryId,
  data,
  onSubmit = () => false,
}) => {
  const list = useRef(null);
  const {navigate} = useNavigation();
  const [categoryId, setCategoryId] = useState(activeCategoryId);
  const [selectedItem, setSelectedItem] = useState({});
  const [gender, setGender] = useState({value: 'all'});

  useEffect(() => {
    let categorySearchOptions = {
      category: categoryId,
      service: selectedItem ? selectedItem.id : null,
      title: categoryId
        ? data.filter(p => p.id === categoryId)[0].title
        : selectedItem.title,
      gender: gender.value,
    };
    onSubmit(categorySearchOptions, selectedItem.id ? true : false);
  }, [gender, categoryId, selectedItem]);

  return (
    <Animated.View
      entering={FadeInUp.duration(350).easing(Easing.cubic(Easing.in))}
      style={[tw.style('bg-white px-4 py-7 rounded-3xl shadow-md '), style]}>
      <View style={tw`flex-row w-full justify-between items-center mb-4.5`}>
        <Text
          style={tw`
        bv-heading-base text-primary capitalize`}>
          What Service?
        </Text>
        <GenderSelect onSubmit={val => setGender(val)} />
      </View>
      <InputWrapper
        placeholder={'Try Haircut, or massage, whatever.'}
        style={tw`mb-4`}
        isActive
        onPress={() => {
          navigate('SearchModal', {
            title: 'Recent Searches',
            placeholder: 'Try Haircut, or massage, whatever.',
            type: 'category',
            onSubmit: item => setSelectedItem(item),
          });
        }}
        preffix={<SearchNormal size={24} color="#5948AA" style={tw`mr-3`} />}
      />
      <FlatList
        ref={list}
        horizontal
        initialScrollIndex={data.findIndex(a => a.id === categoryId)}
        data={data}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => <View style={tw`w-4 h-full`} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <CategoryCard
            onPress={() => setCategoryId(item.id)}
            isChecked={categoryId === item.id ? true : false}
            title={item.title}
            image={item.cover.url}
          />
        )}
      />
    </Animated.View>
  );
};

export {ServiceSearchCard};
