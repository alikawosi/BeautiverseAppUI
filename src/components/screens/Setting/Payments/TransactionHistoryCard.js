import {View, Text} from 'react-native';
import React from 'react';

import tw from '../../../../../tailwind';

const TransactionHistoryCard = ({
  style,
  title,
  date,
  type,
  price,
  description,
}) => {
  console.log(type);
  return (
    <View style={tw.style('bg-white rounded-2xl px-5 mb-2 py-4  ', style)}>
      <View style={tw` flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`bv-heading-base text-primary mr-2`}>{title}</Text>
          <View style={tw` px-2 py-1 rounded-1 bg-primary `}>
            <Text style={tw` bv-med-xs capitalize text-white`}>{type}</Text>
          </View>
        </View>
        <Text
          style={tw.style('bv-sans-sm text-grayBorder', {
            'text-textRed': type === 'pay' || 'canceled',
            'text-basicGreen': type === 'refund',
            'text-basicYellow': type === 'pending' || type === 'unpaid',
          })}>
          {type !== 'canceled'
            ? `${
                type === 'pay' || 'unpaid' ? '-' : type === 'refund' ? '+' : ''
              }${price}`
            : 'Canceled'}
        </Text>
      </View>
      <View style={tw` flex-row justify-between items-center`}>
        <Text style={tw`bv-sans-xs text-grayBorder`}>{date} </Text>
        {/* <Button
          title={'Details'}
          titleStyle={tw`bv-sans-xs `}
          defaultColor={'#5948AA'}
        /> */}
      </View>
      <Text style={tw`bv-reg-sm text-black`}>{description}</Text>
    </View>
  );
};

export {TransactionHistoryCard};
