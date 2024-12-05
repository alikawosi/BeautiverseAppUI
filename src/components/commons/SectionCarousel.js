import React, {useRef} from 'react';
import {View, Text, FlatList, Pressable, Dimensions} from 'react-native';

import tw from '../../../tailwind';
import {UnderLineTabBar} from '.';
import {ArrowRight2} from 'iconsax-react-native';

const SectionCarousel = ({
  sectionTitle,
  linkLabel,
  linkLabelStyle,
  onLinkPress,
  data,
  renderOption,
  style,
  sepratorStyle,
  headerStyle,
  headerTitleStyle,
  bodyStyle,
  isTabBarEnable,
  tabBarData,
  snapToIndex,
}) => {
  const flatlistRef = useRef(null);

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 100});

  return (
    <View style={tw.style('w-full mb-4', style)}>
      <View
        style={tw.style(
          'flex flex-row items-center justify-between',
          headerStyle,
        )}>
        <Text style={tw.style('bv-heading-xl', headerTitleStyle)}>
          {sectionTitle}
        </Text>
        <Pressable style={tw`flex-row items-center `} onPress={onLinkPress}>
          <Text
            style={tw.style('bv-sans-xs text-primary mr-2', linkLabelStyle)}>
            {linkLabel}
          </Text>
          {onLinkPress ? <ArrowRight2 size={14} color={'#5948AA'} /> : null}
        </Pressable>
      </View>
      {isTabBarEnable ? (
        <View style={tw`px-5 mt-4`}>
          <UnderLineTabBar data={tabBarData} />
        </View>
      ) : null}
      <FlatList
        ref={flatlistRef}
        contentContainerStyle={tw.style(bodyStyle)}
        snapToInterval={
          snapToIndex ? Dimensions.get('window').width * 0.95 : null
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        overScrollMode={snapToIndex ? 'never' : null}
        snapToAlignment={snapToIndex ? 'center' : null}
        viewabilityConfig={snapToIndex ? viewConfigRef.current : null}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatlistRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        data={data}
        renderItem={renderOption}
        ItemSeparatorComponent={() => (
          <View style={tw.style('w-4 h-full', sepratorStyle)} />
        )}
        keyExtractor={(item, index) => String(item.id || index)}
      />
    </View>
  );
};

export {SectionCarousel};
