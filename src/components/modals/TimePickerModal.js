import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const TimePickerModal = ({route}) => {
  const {
    onSubmit = () => {
      false;
    },
  } = route.params;
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const {goBack} = useNavigation();

  useEffect(() => {
    if (endTime - startTime <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [startTime, endTime]);

  return (
    <ModalWrapper titleSeparator title={'Set Time'} type="fromBottom">
      <View style={tw.style('flex-row w-full justify-center  items-center')}>
        <DatePicker
          date={startTime}
          mode="time"
          onDateChange={setStartTime}
          style={tw`p-5 m-5 w-[130px]`}
          textColor={'#5948AA'}
          minuteInterval={15}
        />
        <Text style={tw`bv-heading-xl m-5 text-basicGray`}>To</Text>
        <DatePicker
          date={endTime}
          mode="time"
          onDateChange={setEndTime}
          style={tw`p-5 m-5 w-[130px]`}
          textColor={'#5948AA'}
          minuteInterval={15}
        />
      </View>
      <Button
        containerStyle={tw`mb-4`}
        title="Confrim"
        onPress={() => {
          onSubmit(
            startTime.toTimeString().substring(0, 5),
            endTime.toTimeString().substring(0, 5),
          );
          goBack();
        }}
        primary
        disabled={disabled}
      />
    </ModalWrapper>
  );
};

export {TimePickerModal};
