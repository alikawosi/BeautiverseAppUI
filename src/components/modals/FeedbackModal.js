import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import tw from '../../../tailwind';
import {REVIEW_CONST} from '../../constants';
import {Button, ModalWrapper} from '../commons';
import {SortTag} from '../screens/SearchResult';

const FeedbackModal = () => {
  const [sliderValue, setSliderValue] = useState([0]);
  const Separator = props => {
    const {style} = props;
    return (
      <View style={tw.style('w-full h-px bg-black/10 mb-4 mt-6', style)} />
    );
  };
  return (
    <ModalWrapper
      type="fromBottom"
      title={'Feedback'}
      titleSeparator
      style={tw`px-5`}>
      <Text style={tw`bv-heading-sm my-4 text-center`}>
        Do you have more thoughts to share?
      </Text>
      <View style={tw`flex-row w-full justify-between`}>
        <SortTag containerStyle={tw`flex-1 mr-2`} title={'Yes'} />
        <SortTag containerStyle={tw`flex-1 ml-2`} title={'No'} />
      </View>
      <Separator style={tw`mb-4 mt-6`} />
      <Text style={tw`bv-heading-sm my-4 text-center`}>Will you go back?</Text>
      <View style={tw`flex-row w-full justify-between`}>
        <SortTag containerStyle={tw`flex-1`} title={'Yes'} />
        <SortTag containerStyle={tw`flex-1 mx-4`} title={'Maybe'} />
        <SortTag containerStyle={tw`flex-1`} title={'No'} />
      </View>
      <Separator style={tw`mb-4 mt-6`} />
      <Text style={tw`bv-heading-sm mt-4 mb-18 text-center`}>
        How likely are you to recommend AAAAAAAAAAAA to a friend?
      </Text>
      <Slider
        trackStyle={tw`h-2 rounded-full`}
        animateTransitions
        maximumTrackTintColor="#F0F0F0"
        step={1}
        maximumValue={10}
        minimumTrackTintColor="#5948AA"
        minimumValue={0}
        thumbTintColor=""
        value={sliderValue}
        onValueChange={v => setSliderValue(v)}
        renderAboveThumbComponent={i => (
          <View>
            <Image
              style={tw`w-8 h-10`}
              source={require('../../assets/media/Thumb.png')}
            />
            <Text
              style={tw`bv-heading-sm text-white absolute self-center top-2`}>
              {sliderValue[i]}
            </Text>
          </View>
        )}
        renderThumbComponent={() => (
          <View
            style={tw`bg-primary h-5 w-5 rounded-full border-2 border-white`}
          />
        )}
      />
      <View style={tw`flex-row justify-between`}>
        {REVIEW_CONST.ReacommendRate.map(item => (
          <Text key={item.id} style={tw`bv-sans-xs text-grayBorder`}>
            {item.title}
          </Text>
        ))}
      </View>
      <Button
        containerStyle={tw`mt-6`}
        primary
        title={'Submit'}
        size={'small'}
      />
    </ModalWrapper>
  );
};

export {FeedbackModal};
