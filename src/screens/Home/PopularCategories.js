import React from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {CategoryCard} from '../../components/elements';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const PopularCategories = ({route}) => {
  const {goBack, navigate} = useNavigation();
  const getPopularCategories = useQuery({
    queryFn: () => axios.get('/categories/popular'),
    onError: () => goBack(),
  });

  const renderItem = ({item}) => {
    return (
      <CategoryCard
        onPress={() =>
          navigate('Search', {
            screen: 'ServiceSearch',
            params: {
              activeCategoryId: item.id,
              categoryData: route.params.data,
            },
          })
        }
        title={item.title}
        image={item.cover.url}
      />
    );
  };
  return getPopularCategories.isLoading || getPopularCategories.isFetching ? (
    <LoadingScreenLayout style={tw`flex-1 bg-background `} />
  ) : (
    <FlatList
      style={tw`flex-1 bg-background pt-4 px-5`}
      contentContainerStyle={tw`mx-2 flex-1`}
      keyExtractor={(item, index) => String(item.id || index)}
      data={getPopularCategories.data}
      renderItem={item => renderItem(item)}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      columnWrapperStyle={tw`justify-between`}
      ItemSeparatorComponent={() => <View style={tw`h-4`} />}
    />
  );
};

export default PopularCategories;
