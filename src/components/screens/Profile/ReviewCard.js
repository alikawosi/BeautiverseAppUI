import {More, Verify} from 'iconsax-react-native';
import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {View, Text, Image, Pressable} from 'react-native';

import tw from '../../../../tailwind';
import {CardTag} from '../../elements';

const ReviewCard = ({
  image,
  userName,
  isUserVerified,
  category,
  rate,
  date,
  isReviewVerified,
  desc,
}) => {
  return (
    <View style={tw`border border-basicGray rounded-15 p-4 my-2.5`}>
      <Pressable style={tw`p-3 absolute right-0`}>
        <More color="#717171" />
      </Pressable>
      <View style={tw`flex-row`}>
        <View style={tw`w-3/12`}>
          <Image
            style={tw`w-14 h-14 rounded-full`}
            source={
              image ? image : require('../../../assets/media/UserDefault.png')
            }
          />
        </View>
        <View style={tw`w-9/12 justify-center`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`bv-heading-base mr-1`}>
                {userName ? userName : null}
              </Text>
              {isUserVerified ? (
                <Verify size={16} color="#5948AA" variant="Bold" />
              ) : null}
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <AirbnbRating
              size={15}
              showRating={false}
              selectedColor="#FF9100"
              unSelectedColor="#C9D2DD"
              defaultRating={rate}
              isDisabled
            />
            <Text style={tw`bv-reg-xs text-basicGray mx-1`}>{'|'}</Text>
            <Text style={tw`bv-reg-xs text-grayBorder`}>{date}</Text>
          </View>
          {isReviewVerified ? (
            <Text style={tw`bv-med-xs text-primary`}>Verified Review</Text>
          ) : null}
        </View>
      </View>
      {category ? (
        <CardTag style={tw`w-15 h-6 rounded-full mt-1.5`}>
          <Text style={tw`font-heading text-sm text-primary`}>Lashes</Text>
        </CardTag>
      ) : null}
      <Text style={tw`bv-med-sm mt-2`}>{desc}</Text>
    </View>
  );
};

export {ReviewCard};
