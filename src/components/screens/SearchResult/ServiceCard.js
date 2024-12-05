import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {Verify, Shop, Heart, rtns, Like} from 'iconsax-react-native';
import {Dimensions, View, Text, Image, Pressable, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {ServiceSubCard} from '../SearchResult';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const ServiceCard = ({
  imageList = [],
  ref,
  name,
  isVerify,
  isAvailable,
  isMaestro,
  image,
  address,
  isFavorite,
  showFavorite = true,
  offerList,
  style,
  carouselWidth = width * 0.832,
  carouselHeight = width * 0.5546,
  onPress = () => false,
}) => {
  const progressValue = useSharedValue(0);
  const [isLiked, setIsLiked] = useState(isFavorite);
  const {navigate} = useNavigation();
  const PaginationItem = props => {
    const {index, length, item} = props;
    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputColorRange = ['#FFFFFF50', '#FFFFFF', '#FFFFFF50'];
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
        style={[tw`w-2 h-2 mx-0.5 rounded-full bg-white`, animStyle]}
      />
    );
  };
  const renderOption = ({item}) => {
    return (
      <ServiceSubCard
        offerTitle={item.title}
        duration={item.time}
        oldPrice={item.price}
        newPrice={item.sale_price}
        onPress={() => {
          navigate('Profile', {
            screen: 'ProfessionalProfile',
            params: {professionalId: item.id},
          });
        }}
      />
    );
  };

  return (
    <Pressable ref={ref} onPress={onPress} style={tw.style(style)}>
      <View style={tw`mb-3 overflow-hidden`}>
        <Carousel
          loop
          width={carouselWidth}
          height={carouselHeight}
          data={imageList}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          renderItem={index => (
            <View style={tw`mr-5`}>
              <Image
                key={index}
                style={tw`h-full w-full rounded-15 `}
                source={require('../../../assets/media/ServiceImage1.png')}
              />
            </View>
          )}
        />
        <View
          style={tw`flex-row items-center justify-center bottom-2 absolute self-center`}>
          {imageList.map((item, index) => (
            <PaginationItem
              item={item}
              index={index}
              key={index}
              length={imageList.length}
            />
          ))}
        </View>
        {showFavorite ? (
          <Pressable
            onPress={() => setIsLiked(!isLiked)}
            style={tw`p-1 rounded-lg absolute bg-[#343434] bg-opacity-30 top-3 right-3`}>
            <Heart
              size="25"
              color={isLiked ? 'red' : 'white'}
              variant={isLiked ? 'Bold' : 'Linear'}
            />
          </Pressable>
        ) : null}

        {isAvailable ? (
          <View
            style={tw`p-1 rounded-lg justify-center items-center bg-basicGreen/15 w-22 absolute right-4 bottom-2`}>
            <Text style={tw`bv-heading-xs text-basicGreen`}>Available Now</Text>
          </View>
        ) : null}
      </View>
      <View style={tw` `}>
        <View style={tw`flex-row `}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={
              typeof image === 'string'
                ? {
                    uri: image,
                  }
                : require('../../../assets/media/UserDefault.png')
            }
          />
          {isMaestro ? (
            <View
              style={tw`h-4 w-12 absolute bottom-0 rounded-10 bg-basicYellow items-center justify-center`}>
              <Text style={tw`bv-med-xs`}>Maestro</Text>
            </View>
          ) : null}
          <View style={tw`flex-1 justify-around pl-3`}>
            <View style={tw`flex-row items-center  justify-between`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`bv-heading-base mr-1`}>
                  {name ? name : null}
                </Text>
                {isVerify ? (
                  <Verify size={16} color="#5948AA" variant="Bold" />
                ) : null}
              </View>
            </View>

            <View style={tw`flex-row items-center`}>
              <Shop size={14} color="#7A7A8A" />
              <Text style={tw`bv-sans-xs text-textGray ml-3`}>{address}</Text>
              {rtns ? (
                <>
                  <Text style={tw`bv-sans-xs text-lightGray mx-3`}>|</Text>
                  <Like size="14" color="#7A7A8A" variant="Outline" />
                  <Text style={tw`bv-sans-xs text-textGray `}>{rtns}</Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
        {offerList ? (
          <FlatList
            style={tw`mr-4 mt-2`}
            data={offerList}
            renderItem={item => renderOption(item)}
            ItemSeparatorComponent={() => <View style={tw`w-2 h-full`} />}
            keyExtractor={(item, index) => String(item.id || index)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : null}
      </View>
    </Pressable>
  );
};

export {ServiceCard};
