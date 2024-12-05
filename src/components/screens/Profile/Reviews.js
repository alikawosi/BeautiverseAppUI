import React from 'react';
import {View, Text} from 'react-native';
import {Sort} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {Button, UnderLineTabBar} from '../../commons';
import {RatingCard, ReviewCard} from './';
import {
  ProfileReviewTabBarItem,
  ProfileReviewSortData,
  RatingData,
  ReviewData,
} from '../../../constants';

const Reviews = () => {
  const {navigate} = useNavigation();

  const Separator = () => {
    return <View style={tw`border-lightGray border my-4`} />;
  };

  return (
    <View>
      <Separator />
      <UnderLineTabBar data={ProfileReviewTabBarItem} />
      <RatingCard rating={4.3} reviewCount={142} options={RatingData} />
      <View style={tw`items-end`}>
        <Button
          style={tw`h-auto`}
          title={'Report This Profile'}
          titleStyle={tw`underline`}
          defaultColor="#717171"
        />
      </View>
      <Separator />
      <View>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`bv-heading-base text-primary`}>Reviews</Text>
          <Button
            style={tw`h-auto border border-basicGray rounded-10 py-2 px-3`}
            titleStyle={tw`bv-sans-sm`}
            defaultColor={'#5948AA'}
            icon={<Sort size={18} color="#5948AA" />}
            title={'Sort'}
            onPress={() =>
              navigate('SelectModal', {
                label: 'Sort By',
                options: ProfileReviewSortData,
              })
            }
          />
        </View>
        {ReviewData.map(item => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
};

export {Reviews};
