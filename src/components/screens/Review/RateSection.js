import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import tw from '../../../../tailwind';

const RateSection = ({title, rate, style}) => {
  const [sliderValue, setSliderValue] = useState(1);

  return (
    <View style={tw`w-full mb-6`}>
      <Text style={tw`bv-heading-sm`}>{title}</Text>
      <Slider
        trackStyle={tw`h-2 rounded-full`}
        animateTransitions
        maximumTrackTintColor="#F0F0F0"
        step={1}
        maximumValue={5}
        minimumTrackTintColor="#5948AA"
        minimumValue={1}
        //thumbTintColor=""
        value={sliderValue}
        onValueChange={v => setSliderValue(v)}
        renderThumbComponent={() => (
          <View
            style={tw`bg-primary h-5 w-5 rounded-full border-2 border-white`}
          />
        )}
      />
      <View style={tw`flex-row justify-between px-1`}>
        {[...new Array(5).keys()].map(item => (
          <View key={item} style={tw`w-1.5 h-1.5 bg-basicGray rounded-full`} />
        ))}
      </View>
    </View>
  );
};

export {RateSection};
