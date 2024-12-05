import React from 'react';
import {View, Text, Image} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Shop, Verify} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Button} from '../../components/commons';
import {RateSection} from '../../components/screens/Review';

const DetailedReview = ({
  name = 'Alice Berton',
  isVerify = true,
  isMaestro = true,
  image,
  address = '662 Annette St',
  distance = '2',
  category,
  time,
  date,
  dueDate,
  offerTitle,
  offPercentage,
  newPrice,
  oldPrice,
  duration,
  isUpcoming,
}) => {
  const {bottom} = useSafeAreaInsets();
  const Separator = props => {
    const {style} = props;
    return (
      <View style={tw.style('w-full h-px bg-black/10 mb-4 mt-6', style)} />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 px-5 bg-white`}>
      <Separator style={tw`my-4`} />
      <View style={tw`flex-row mt-5`}>
        <View style={tw`items-center`}>
          <Image
            style={tw`w-18 h-18 rounded-full`}
            source={
              image ? image : require('../../assets/media/UserDefault.png')
            }
          />
          {true ? (
            <View
              style={tw`rounded-10 bg-basicYellow w-15 px-1 py-0.5 items-center absolute top-15`}>
              <Text style={tw`bv-sans-xs`}>Maestro</Text>
            </View>
          ) : null}
        </View>
        <View style={tw`w-9/12 justify-around ml-4`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`bv-heading-lg mr-1`}>
                {name ? name : 'unknown'}
              </Text>
              {isVerify ? (
                <Verify size={16} color="#5948AA" variant="Bold" />
              ) : null}
            </View>
          </View>
          {address || distance ? (
            <View style={tw`flex-row items-center`}>
              {address ? (
                <View style={tw`flex-row`}>
                  <Shop size={16} color="#5948AA" />
                  <Text style={tw`bv-sans-sm text-primary ml-1`}>
                    {address}
                  </Text>
                </View>
              ) : null}
              {distance ? (
                <View style={tw`flex-row`}>
                  <Text style={tw`bv-sans-sm text-gray-300 mx-1`}>{'|'}</Text>
                  <Text style={tw`bv-sans-sm text-primary`}>{distance} km</Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
      <Separator style={tw`my-6`} />
      <RateSection title={'Satisfaction'} rate={55} />
      <RateSection title={'On-Time'} rate={55} />
      <RateSection title={'Friendliness'} rate={55} />
      <RateSection title={'Location'} rate={55} />
      <RateSection title={'Cleanliness'} rate={55} />
      <View style={tw`absolute w-screen bottom-0 mb-[${bottom}] px-5`}>
        <Separator style={tw`w-screen -ml-5`} />
        <Button primary title={'Submit'} size={'small'} />
      </View>
    </SafeAreaView>
  );
};

export default DetailedReview;
