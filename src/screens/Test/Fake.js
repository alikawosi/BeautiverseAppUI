import {
  View,
  Text,
  StatusBar,
  Animated,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';

const {width, height} = Dimensions.get('screen');
const data = [...new Array(4).keys()];
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const Indicator = ({scrollX}) => {
  return (
    <View style={tw`absolute bottom-10 z-10 flex-row`}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const widthStyle = scrollX.interpolate({
          inputRange,
          outputRange: [4, 28, 4],
          extrapolate: 'clamp',
        });
        const colorStyle = scrollX.interpolate({
          inputRange,
          outputRange: ['#717171', '#DEA0AF', '#717171'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={tw.style('h-3 w-3 rounded-full bg-gray-300 m-3', {
              backgroundColor: colorStyle,
              width: widthStyle,
            })}
          />
        );
      })}
    </View>
  );
};

const Fake = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.index}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({index}) => (
          <View style={tw.style('border justify-center', {width})}>
            <Text style={tw`text-center text-3xl`}>{index}</Text>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default Fake;
