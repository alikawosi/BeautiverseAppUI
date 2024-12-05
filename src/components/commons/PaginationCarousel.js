import React from 'react';
import {Dimensions, View, Image, Pressable} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';

const PaginationCarousel = ({data, style}) => {
  const {navigate} = useNavigation();
  const width = Dimensions.get('window').width;
  const progressValue = useSharedValue(0);
  const PaginationItem = props => {
    const {index, length, item} = props;
    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputRange = [4, 28, 4];
      let outputColorRange = ['#FFFFFF50', '#FFFFFF', '#FFFFFF50'];
      if (index === 0 && progressValue.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
      }
      return {
        width: interpolate(
          progressValue.value,
          inputRange,
          outputRange,
          Extrapolate.CLAMP,
        ),
        backgroundColor: interpolateColor(
          progressValue.value,
          inputRange,
          outputColorRange,
        ),
      };
    }, [index, length]);

    return (
      <Animated.View
        key={item.id}
        style={[tw`w-1 h-1 mx-0.5 rounded-full bg-lightGray`, animStyle]}
      />
    );
  };

  return (
    <>
      {data.filter(item => typeof item.url !== 'boolean').length > 0 ? (
        <>
          <View style={tw.style('justify-center items-center ', style)}>
            <Carousel
              loop
              width={width}
              height={width / 1.9}
              data={data}
              onProgressChange={(_, absoluteProgress) => {
                progressValue.value = absoluteProgress;
              }}
              scrollAnimationDuration={1000}
              renderItem={index => (
                <Pressable
                  // onPress={() => navigate('Referrals')}
                  style={tw.style('flex-1 justify-center  px-5 ')}>
                  <Image
                    style={tw`flex-1 rounded-15`}
                    source={{uri: index.item.img}}
                  />
                </Pressable>
              )}
            />
            <View
              style={tw` flex-row items-center absolute h-8 bottom-0 right-8 justify-center `}>
              {data.map((item, index) => (
                <PaginationItem
                  item={item}
                  index={index}
                  key={index}
                  length={data.length}
                />
              ))}
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

export {PaginationCarousel};
