import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image, Pressable, Share} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2, Export, Heart} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const ProfileCarousel = ({
  professionalId,
  imageList,
  isFavorite,
  url,
  onPressFavorite = () => false,
}) => {
  const {goBack, navigate} = useNavigation();
  const width = Dimensions.get('window').width;
  const progressValue = useSharedValue(0);
  const [iconStyle, setIconStyle] = useState({
    color: isFavorite ? 'red' : 'white',
    variant: isFavorite ? 'Bold' : null,
  });

  useEffect(() => {
    if (!isFavorite) {
      setIconStyle({
        color: 'white',
        variant: null,
      });
    } else {
      setIconStyle({
        color: 'red',
        variant: 'Bold',
      });
    }
  }, [isFavorite]);

  const PaginationItem = props => {
    const {index, length, item} = props;
    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputColorRange = ['#FFFFFF', '#5948AA', '#FFFFFF'];
      if (index === 0 && progressValue.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
      }
      return {
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
        style={[tw`w-1.5 h-1.5 mx-0.5 rounded-full bg-white`, animStyle]}
      />
    );
  };
  const ImageButton = props => {
    const {title, icon, top, bottom, left, right, onPress} = props;

    return (
      <Pressable
        onPress={onPress}
        style={tw.style(
          'px-2 py-2.5 rounded-xl absolute bg-[#343434] bg-opacity-30',
          {
            top,
            bottom,
            left,
            right,
          },
        )}>
        {title ? (
          <Text style={tw`text-white text-sm font-heading`}>{title}</Text>
        ) : (
          React.createElement(icon, {
            color: right === 20 ? iconStyle.color : 'white',
            variant: right === 20 ? iconStyle.variant : null,
          })
        )}
      </Pressable>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: url,
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 1.5}
        data={imageList}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        //style={tw`bg-green-400`}
        renderItem={index => (
          <Image style={tw`w-full h-full`} source={{uri: index.item.url}} />
        )}
      />
      <View
        style={tw`flex-row items-center justify-center bottom-4 absolute self-center`}>
        {imageList.map((item, index) => (
          <PaginationItem
            item={item}
            index={index}
            key={index}
            length={imageList.length}
          />
        ))}
      </View>
      <ImageButton
        onPress={() => navigate('Portfolio', {professionalId: professionalId})}
        title="See Portfolio"
        bottom={12}
        left={20}
      />
      <ImageButton
        onPress={() => goBack()}
        icon={ArrowLeft2}
        top={10}
        left={20}
      />
      <ImageButton
        onPress={() => onPressFavorite()}
        icon={Heart}
        top={10}
        right={20}
      />
      <ImageButton
        onPress={() => onShare()}
        icon={Export}
        top={10}
        right={70}
      />
    </View>
  );
};

export {ProfileCarousel};
