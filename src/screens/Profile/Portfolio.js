import React, {useEffect, useMemo, useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {UnderLineTabBar} from '../../components/commons';
import LoadingScreenLayout from '../../components/commons/LoadingScreenLayout';

const Portfolio = ({route}) => {
  const {goBack} = useNavigation();
  const [imageList, setimageList] = useState([]);
  const [tabBarData, setTabBarData] = useState([{id: 0, title: 'All Photos'}]);

  // useEffect(() => {
  //   if (getPortfolio.isSuccess) {
  //     setTabBarData([...getPortfolio.data.categories]);
  //   }
  // }, []);

  const getPortfolio = useQuery({
    queryFn: async () =>
      await axios.get('/beautician/single/portfolio', {
        params: {
          id: route.params.professionalId,
        },
      }),
    queryKey: ['GetBeauticianPortfolio'],
    onSuccess: data => {
      setimageList(data.images.filter(item => typeof item.url !== 'boolean'));
      let tabBarList = [{id: 0, title: 'All Photos'}, ...data.categories];
      setTabBarData(tabBarList);
    },
    onError: () => goBack(),
  });

  const onPressTab = id => {
    if (id === 0) {
      setimageList(
        getPortfolio.data.images.filter(item => typeof item.url !== 'boolean'),
      );
    } else {
      let filteredList = getPortfolio.data.images.filter(
        item => item.category === id && typeof item.url !== 'boolean',
      );
      setimageList(filteredList);
    }
  };

  return getPortfolio.isLoading || getPortfolio.isFetching ? (
    <LoadingScreenLayout style={tw`flex-1 bg-background `} />
  ) : (
    <View style={tw`flex-1 bg-background px-5`}>
      <UnderLineTabBar data={tabBarData} onPressTab={id => onPressTab(id)} />
      <MasonryList
        data={imageList}
        keyExtractor={(item, index) => String(item.id || index)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={tw`rounded-2xl p-1`}>
            <Image
              style={tw.style(' rounded-2xl', {
                height: Math.random() < 0.5 ? 150 : 280,
                alignSelf: 'stretch',
              })}
              source={{uri: item.url}}
            />
          </View>
        )}
        contentContainerStyle={tw`mt-4`}
        //refreshing={isLoadingNext}
        //onRefresh={() => refetch({first: ITEM_CNT})}
        //onEndReachedThreshold={0.1}
        //onEndReached={() => loadNext(ITEM_CNT)}
      />
    </View>
  );
};

export default Portfolio;
