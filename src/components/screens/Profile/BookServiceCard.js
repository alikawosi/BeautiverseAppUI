import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {RadioButton} from '../../commons';

const BookServiceCard = ({
  id,
  serviceTitle,
  priceRange,
  durationRange,
  desc,
  isAddOn,
  options = false,
  imageList,
  seprator,
  initialValue,
  onPress = () => false,
}) => {
  const {navigate} = useNavigation();
  const [isContentShow, setIsContentShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    if (initialValue?.length > 0) {
      setIsContentShow(true);
      if (initialValue[0].variationId) {
        setActiveItem(initialValue[0].variationId);
      } else {
        setIsActive(true);
      }
    } else {
      setActiveItem();
      setIsActive(false);
    }
  }, [initialValue]);

  // const Separator = () => {
  //   return (
  //     <LinearGradient
  //       colors={['#AB65F1', '#5E4BA5']}
  //       style={tw`h-px w-full mt-2`}
  //     />
  //   );
  // };

  const OffCard = props => {
    const {off} = props;
    return (
      <View
        style={tw`justify-center items-center rounded-10  bg-[#222433] mx-2 py-1 px-4`}>
        <Text
          style={tw`bv-heading-xs text-white text-center`}>{`${off}%`}</Text>
      </View>
    );
  };

  const DetailCard = props => {
    const {
      variationId,
      title,
      oldPrice,
      newPrice = false,
      duration,
      off,
      index,
    } = props;
    return (
      <Pressable
        onPress={() =>
          radioButtonPressHandler({
            variationId: variationId,
            price: oldPrice,
            duration: duration,
            title: title,
            discountedPrice: newPrice,
          })
        }>
        <View style={tw`w-full flex-row py-2`}>
          <View style={tw`w-11/12`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`capitalize bv-sans-base`}>{title}</Text>
            </View>
            <View style={tw`flex flex-row`}>
              {newPrice ? (
                <Text
                  style={tw`font-med text-sm text-black mr-2`}>{`$${newPrice}`}</Text>
              ) : null}
              {oldPrice ? (
                <Text
                  style={tw.style('font-med text-black text-sm', {
                    'line-through text-disable': newPrice !== '',
                  })}>
                  {`$${oldPrice}`}
                </Text>
              ) : null}
              {duration ? (
                <View style={tw`flex-row`}>
                  <Text style={tw`font-sans text-xs text-grayBorder mx-2`}>
                    {'|'}
                  </Text>
                  <Text
                    style={tw`font-med text-sm text-black`}>{`${duration} min`}</Text>
                </View>
              ) : null}
              {off ? <OffCard off={off} /> : null}
            </View>
          </View>
          <View style={tw`w-1/12 items-center justify-center`}>
            <RadioButton
              size={18}
              isChecked={activeItem === variationId}
              onPress={() => {
                let p = {
                  variationId: variationId,
                  price: oldPrice,
                  duration: duration,
                  title: title,
                  discountedPrice: newPrice,
                };
                radioButtonPressHandler(p);
              }}
            />
          </View>
        </View>
        {options.length - 1 === index ? null : (
          <View style={tw`w-full h-px bg-black opacity-10`} />
        )}
      </Pressable>
    );
  };

  const itemPressHandler = () => {
    if (options === false) {
      setIsActive(!isActive);
      onPress(id);
    } else {
      setIsContentShow(!isContentShow);
    }
  };

  const radioButtonPressHandler = item => {
    if (item.variationId === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(item.variationId);
    }

    onPress(item);
  };
  return (
    <View
      style={tw.style('w-full  border-basicGray rounded-15 pb-4  mb-4', {
        'border-b-0.25': seprator,
      })}>
      {isAddOn ? (
        <Text
          style={tw`bv-sans-xs text-primary absolute right-7 top-0 -mt-2 bg-white px-1`}>
          Add-On
        </Text>
      ) : null}
      <Pressable onPress={() => itemPressHandler()}>
        <View style={tw`flex-row`}>
          <View style={tw`w-11/12 justify-center`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`capitalize bv-heading-lg text-black`}>
                {serviceTitle}
              </Text>
              <Pressable
                onPress={() =>
                  navigate('MoreInfoModal', {
                    title: serviceTitle,
                    imageList: imageList,
                    desc: desc,
                  })
                }
                style={tw`ml-2`}>
                <Text style={tw`underline bv-med-xs text-gray-500`}>
                  More Info
                </Text>
              </Pressable>
            </View>
            {isContentShow && desc ? (
              <Text style={tw`capitalize bv-sans-sm  mb-4 `}>{desc}</Text>
            ) : null}
            {!isContentShow && (
              <View style={tw`flex flex-row`}>
                <Text
                  style={tw`font-med text-sm text-black`}>{`$${priceRange[0]}`}</Text>
                {priceRange[1] ? (
                  <Text style={tw`font-med text-sm text-black`}>
                    {`-$${priceRange[1]}`}
                  </Text>
                ) : null}
                <View style={tw`flex-row`}>
                  <Text style={tw`font-sans text-xs text-grayBorder mx-2`}>
                    {'|'}
                  </Text>
                  <Text
                    style={tw`font-med text-sm text-black`}>{`${durationRange[0]} min`}</Text>
                  {durationRange[1] ? (
                    <Text
                      style={tw`font-med text-sm text-black`}>{`-${durationRange[1]} min`}</Text>
                  ) : null}
                </View>
              </View>
            )}
          </View>
          <View style={tw`w-1/12 items-center justify-center`}>
            {options.length > 0 ? (
              !isContentShow ? (
                <ArrowDown2
                  size={20}
                  color="#222433"
                  onPress={() => itemPressHandler()}
                />
              ) : (
                <ArrowUp2 size={20} color="#222433" />
              )
            ) : (
              <RadioButton
                size={18}
                isChecked={isActive}
                onPress={() => itemPressHandler()}
              />
            )}
          </View>
        </View>
      </Pressable>
      {isContentShow && options && (
        <View style={tw`w-full`}>
          <ScrollView>
            {options.map((item, index) => (
              <DetailCard
                index={index}
                key={item.id}
                variationId={item.id}
                title={item.title}
                oldPrice={item.price}
                newPrice={item.sale_price}
                duration={item.time + ' min'}
                off={
                  item.sale_price
                    ? (
                        ((item.price - item.sale_price) * 100) /
                        item.price
                      ).toFixed()
                    : null
                }
              />
            ))}
          </ScrollView>
          {/* <FlatList
            //contentContainerStyle={tw.style('px-5 py-4', bodyStyle)}
            data={options}
            renderItem={({item}) => <DetailCard {...item} />}
            ItemSeparatorComponent={() => <View style={tw`w-4 h-full`} />}
            keyExtractor={(item, index) => String(item.id || index)}
            //horizontal
            //showsHorizontalScrollIndicator={false}
          /> */}
        </View>
      )}
    </View>
  );
};

export {BookServiceCard};
