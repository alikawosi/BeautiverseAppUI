import React from 'react';
import {View, Text} from 'react-native';
import {Messages3, Star1} from 'iconsax-react-native';
import * as Progress from 'react-native-progress';

import tw from '../../../../tailwind';

const RatingCard = ({rating, reviewCount, options}) => {
  const ReviewItem = props => {
    const {title, rate} = props;
    return (
      <View style={tw`flex-row justify-between items-center h-6`}>
        <View style={tw`w-3/12`}>
          <Text style={tw`bv-sans-xs text-grayBorder`}>{title}</Text>
        </View>
        <View style={tw`w-7/12`}>
          <Progress.Bar
            color="#FF9100"
            unfilledColor="#F0F0F0"
            borderWidth={0}
            progress={rate / 5}
            width={null}
            borderRadius={47}
          />
        </View>
        <View style={tw`w-1/12 items-center`}>
          <Text style={tw`bv-heading-xs`}>{rate}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={tw`bg-lightGray my-4 rounded-15 px-3 py-4`}>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Star1 size={20} color="#FF9100" variant="Bold" />
          <Text style={tw`bv-sans-sm ml-1`}>{`Rating: ${rating}`}</Text>
        </View>
        <View style={tw`flex-row`}>
          <Messages3 size={20} color="#292D32" />
          <Text style={tw`bv-sans-sm ml-1`}>{`${reviewCount} Reviews`}</Text>
        </View>
      </View>
      <View style={tw`border-basicGray border-t my-4`} />
      <View>
        {options.map(item => (
          <ReviewItem key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
};

export {RatingCard};
