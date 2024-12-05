import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';
import {AppointmentCardData, APPOINTMENT_CONST} from '../../constants';
import {AppointmentCard} from '../screens/Appointment';

const markedDatesData = {
  '2022-11-25': {dots: APPOINTMENT_CONST.servicesDotData},
  '2022-11-26': {dots: APPOINTMENT_CONST.servicesDotData},
};

const AppointmentCalendarModal = () => {
  const [todayDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState(markedDatesData);

  const onPress = day => {
    var tempMarkDateList = Object.fromEntries(
      Object.entries(markedDatesData).map(([key, val]) => {
        val.selected = false;
        return [key, val];
      }),
    );
    if (Object.keys(markedDatesData).find(item => item === day)) {
      tempMarkDateList[day].selected = true;
      setMarkedDates(tempMarkDateList);
    } else {
      var dateSelected = {[day]: {selected: true}};
      tempMarkDateList = {...tempMarkDateList, ...dateSelected};
      setMarkedDates(tempMarkDateList);
    }
    return;
  };
  return (
    <ModalWrapper
      type="fromBottom"
      title={'Calendar'}
      titleSeparator
      style={tw`px-0`}>
      <View style={tw`px-6`}>
        <Calendar
          initialDate={todayDate.toISOString().substring(0, 10)}
          accessibilityValue={todayDate.toISOString().substring(0, 10)}
          minDate={todayDate.toISOString().substring(0, 10)}
          onDayPress={day => {
            onPress(day.dateString);
          }}
          renderArrow={direction => {
            if (direction === 'right') {
              return <ArrowRight2 size={18} color="#545569" />;
            } else {
              return <ArrowLeft2 size={18} color="#545569" />;
            }
          }}
          hideExtraDays={true}
          monthFormat={'MMM yyyy'}
          disableAllTouchEventsForDisabledDays={true}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          enableSwipeMonths={true}
          markingType={'multi-dot'}
          markedDates={markedDates}
          theme={{
            dayTextColor: '#414141',
            textDayFontFamily: 'Gilroy-SemiBold',
            textDayFontSize: 14,
            monthTextColor: '#545569',
            dotColor: '#5948AA',
            selectedDotColor: 'white',
            'stylesheet.calendar.header': {
              week: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
                paddingBottom: 4,
                borderBottomWidth: 1,
                borderColor: '#CACED9',
              },
              monthText: {
                fontSize: 14,
                fontFamily: 'Gilroy-SemiBold',
                color: '#545569',
                margin: 0,
              },
              dayHeader: {
                marginTop: 0,
                marginBottom: 0,
                width: 32,
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Gilroy-SemiBold',
                color: '#545569',
              },
            },
            'stylesheet.day.basic': {
              selected: {
                backgroundColor: '#5948AA',
                borderRadius: 100,
              },
              todayText: {color: '#5948AA'},
              today: {
                backgroundColor: 'red',
                borderBottomWidth: 1,
                borderColor: '#5948AA',
              },
              disabledText: {
                color: '#7A7A8A',
                // backgroundColor: '#F2F3F6',
                // borderRadius: 100,
                opacity: 0.5,
              },
              inactiveText: {
                color: '#7A7A8A',
                opacity: 0.5,
              },
            },
          }}
        />
      </View>
      <FlatList
        contentContainerStyle={tw`pl-6 py-4`}
        data={AppointmentCardData}
        renderItem={({item}) => <AppointmentCard {...item} isUpcoming />}
        ItemSeparatorComponent={() => <View style={tw`w-2.5 h-full`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ModalWrapper>
  );
};

export {AppointmentCalendarModal};
