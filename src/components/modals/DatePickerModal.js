import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';
import dayjs from 'dayjs';

const DatePickerModal = ({route}) => {
  const {goBack} = useNavigation();
  const {
    title,
    value,
    onSubmit = () => false,
    onBlur = () => false,
  } = route.params;
  const [date, setDate] = useState(value || new Date());

  useEffect(() => {
    return () => {
      onBlur();
    };
  }, []);

  return (
    <ModalWrapper type="fromBottom" title={title} titleSeparator>
      <View style={tw`items-center`}>
        <DatePicker date={date} mode="date" onDateChange={setDate} />
      </View>
      <Button
        title={'Confirm'}
        primary
        onPress={() => {
          onSubmit(
            date.toISOString().substring(0, 10),
            dayjs(date).format('MMM/DD/YYYY'),
          );
          goBack();
        }}
      />
    </ModalWrapper>
  );
};

export {DatePickerModal};
