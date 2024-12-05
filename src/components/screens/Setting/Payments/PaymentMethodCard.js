import {More, TickCircle, Trash} from 'iconsax-react-native';
import React, {useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';

import tw from '../../../../../tailwind';
import {PaymentIcon} from 'react-native-payment-icons';

const PaymentMethodCard = ({
  id,
  style,
  isPrimary = false,
  brand,
  last4cardNumber,
  editable = true,
  onPress = () => false,
  onSubmitPrimary = () => false,
  onDeletePress = () => false,
}) => {
  const [activeKey, setActiveKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(brand);
  return (
    <>
      <Pressable
        onPress={() => onPress(id)}
        style={tw.style(
          ' flex-row w-full mt-2.5 border items-center justify-between border-primary rounded-10 p-2',

          style,
        )}>
        <PaymentIcon
          style={tw`mx-2 w-2/7 `}
          height={50}
          width={50}
          type={brand === 'Visa' ? 'visa' : brand}
        />
        <Text
          style={tw.style(
            'bv-sans-base self-center ',
          )}>{`****  ****  ****  ${last4cardNumber}`}</Text>
        {editable ? (
          activeKey !== id ? (
            <Pressable onPress={() => setActiveKey(id)}>
              <More
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                color="#717171"
              />
            </Pressable>
          ) : (
            <View style={tw`flex-row justify-end `}>
              {!isLoading ? (
                <Trash
                  size="20"
                  color="#D70D19"
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    setIsLoading(true);
                    onDeletePress(id);
                  }}
                />
              ) : (
                <ActivityIndicator />
              )}

              <TickCircle
                size="20"
                color="#5948AA"
                style={tw`mx-4`}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => onSubmitPrimary(id)}
              />
            </View>
          )
        ) : null}
      </Pressable>
      {isPrimary ? (
        <View style={tw`absolute top-0 left-5 z-10 bg-white`}>
          <Text style={tw`bv-sans-sm text-primary`}>Primary</Text>
        </View>
      ) : null}
    </>
  );
};

export {PaymentMethodCard};
