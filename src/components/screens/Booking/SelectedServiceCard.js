import {View, Text} from 'react-native';
import React from 'react';

import tw from '../../../../tailwind';
import {CloseCircle} from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';

const SelectedServiceCard = ({
  title,
  variationTitle,
  discountedPrice,
  price,
  duration,
  style,
  closable,
  seprator,
  onDelete = () => false,
}) => {
  return (
    <View
      style={tw.style(
        'flex-row justify-between items-center  px-3 pb-3',
        {'border-b border-basicGray': seprator},
        style,
      )}>
      <View style={tw`w-7/8 `}>
        <Text style={tw`bv-heading-sm capitalize  `}>{title}</Text>
        <View style={tw`flex-row mb-1`}>
          <Text style={tw`bv-med-sm  mb-1 mr-2 `}>
            {'variation: ' + variationTitle}
          </Text>
          {discountedPrice ? (
            <View style={tw`flex-row py-1 px-3 rounded-10 bg-[#222433]`}>
              <Text style={tw`bv-heading-xs text-white capitalize `}>
                {(((price - discountedPrice) * 100) / price).toFixed() + ' %'}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={tw` flex-row `}>
          {discountedPrice ? (
            <View style={tw` flex-row `}>
              <Text style={tw`bv-med-sm mr-1`}>{discountedPrice}</Text>
              <Text style={tw.style('bv-med-sm line-through text-disable')}>
                {price}
              </Text>
            </View>
          ) : (
            <Text style={tw.style('bv-med-sm ')}>{price}</Text>
          )}
          <Text style={tw`bv-med-sm text-grayBorder mx-2`}>|</Text>
          <Text style={tw`bv-med-sm `}>{duration}</Text>
        </View>
      </View>
      <View style={tw`w-1/8`}>
        {closable ? (
          <CloseCircle onPress={onDelete} size={26} color={'#717171'} />
        ) : null}
      </View>
    </View>
  );
};

export {SelectedServiceCard};
