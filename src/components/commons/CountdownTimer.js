import React, {useEffect} from 'react';
import axios from 'axios';
import {View, Text} from 'react-native';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button} from './Button';
import {useCountdown} from '../../hooks';

const CountdownTimer = ({
  duration,
  textStyle,
  phoneNumber,
  countryCode,
  onTimeEnd = () => {},
  style,
}) => {
  const [minutes, seconds] = useCountdown(duration);
  const remainedTime = minutes + seconds;
  useEffect(() => {
    if (remainedTime <= 0) {
      return onTimeEnd(true);
    } else {
      onTimeEnd(false);
    }
  }, [onTimeEnd, remainedTime]);

  const {reset} = useNavigation();
  const mutation = useMutation(['sendOTP'], () =>
    axios.post('/otp/send', {
      country_code: countryCode,
      phone: phoneNumber,
    }),
  );

  return (
    <View style={tw.style('items-center', style)}>
      {seconds + minutes >= 0 ? (
        <View style={tw`flex-row`}>
          <Text style={tw.style('bv-med-sm text-grayBorder', textStyle)}>
            {`0${minutes}`.slice(-2)}
          </Text>
          <Text style={tw`bv-med-sm text-grayBorder mx-1`}>:</Text>
          <Text style={tw.style('bv-med-sm text-grayBorder', textStyle)}>
            {seconds}
          </Text>
        </View>
      ) : (
        <Button
          title="Resend Code"
          defaultColor="#5948AA"
          titleStyle={tw`bv-med-sm text-primary underline `}
          style={tw`h-auto`}
          onPress={() => {
            mutation.mutate(phoneNumber, countryCode);
            reset({
              index: 0,
              routes: [
                {
                  name: 'Verify',
                  params: {
                    phoneNumber: phoneNumber,
                    countryCode: countryCode,
                  },
                },
              ],
            });
          }}
        />
      )}
    </View>
  );
};

export {CountdownTimer};
