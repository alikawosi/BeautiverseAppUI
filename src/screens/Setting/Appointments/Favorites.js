import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import tw from '../../../../tailwind';
import {EmptyScreen} from '../../../components/commons';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';
import {ProfessionalCard} from '../../../components/elements';

const Favorites = () => {
  const {navigate, goBack} = useNavigation();
  const getFavoriteProfessionals = useQuery({
    queryFn: () =>
      axios.get('/user/favorites', {params: {get_beauticians: true}}),
    onError: () => {
      goBack();
    },
  });
  const renderItem = ({item}) => {
    return (
      <ProfessionalCard
        style={tw` rounded-2xl mb-2 px-5 `}
        onPress={() =>
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {professionalId: item.id},
          })
        }
        name={item.title}
        image={item.img.url}
        tabBarData={item.categories}
        isMaestro={item.maestro}
        isVerify={item.verified}
        isFavorite
        //sex={item.main_category.sex}
        numberOfCustomer={item.apps}
        address={item.location.address}
        satisfactionPercentage={item.rtns}
        // isMobile={
        //   item.service_location === ('anywhere' || 'mobile') ? true : false
        // }
      />
    );
  };
  return getFavoriteProfessionals.isLoading ||
    getFavoriteProfessionals.isFetching ? (
    <LoadingScreenLayout style={tw`flex-1 bg-background`} />
  ) : getFavoriteProfessionals.data.length === 0 ? (
    <EmptyScreen
      style={tw`flex-1 bg-background`}
      description={'you have no favorite pro yet...'}
    />
  ) : (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 bg-background`}>
      <FlatList
        keyExtractor={(item, index) => String(item.id || index)}
        data={getFavoriteProfessionals.data}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
        //ItemSeparatorComponent={() => <View style={tw`h-2 bg-background`} />}
      />
    </SafeAreaView>
  );
};

export default Favorites;
