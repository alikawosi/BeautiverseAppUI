import React from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {ProfessionalCard} from '../../components/elements';

const TopRatedProfessionals = ({route}) => {
  const {navigate} = useNavigation();
  const renderItem = ({item}) => {
    return (
      <ProfessionalCard
        name={item.title}
        image={item.img.url}
        isMaestro={item.maestro}
        isVerify={item.verified}
        tabBarData={item.categories}
        sex={item.main_category.sex}
        numberOfCustomer={item.apps}
        address={item.location.address}
        satisfactionPercentage={item.rtns}
        isMobile={item.main_category.service_location}
        onPress={() =>
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {professionalId: item.id},
          })
        }
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        keyExtractor={(item, index) => String(item.id || index)}
        data={route.params.data}
        renderItem={item => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-4`}
        ItemSeparatorComponent={() => <View style={tw`h-4`} />}
      />
    </View>
  );
};

export default TopRatedProfessionals;
