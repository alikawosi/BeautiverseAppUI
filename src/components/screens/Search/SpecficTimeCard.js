import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const SpecficTimeCard = ({style, calendarStyle, onChange = () => false}) => {
  const {navigate} = useNavigation();
  const [today] = useState(new Date());
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [markedDates, setMarkedDates] = useState({});
  const [markedDatesArray, setMarkedDatesArray] = useState([]);

  useEffect(() => {
    let timeSearchInfo = {
      date_from: markedDatesArray[0],
      date_to: markedDatesArray[markedDatesArray.length - 1],
      time_from: startTime,
      time_to: endTime,
    };
    onChange(timeSearchInfo);
  }, [startTime, endTime, markedDates]);

  const getDaysArray = (startDate, endDate) => {
    for (
      //create dateList
      var dateRange = [], selectedDates = new Date(startDate);
      selectedDates <= new Date(endDate);
      selectedDates.setDate(selectedDates.getDate() + 1)
    ) {
      dateRange.push(new Date(selectedDates).toISOString().substring(0, 10));
    }
    var markedDateObject = {};
    for (let i = 1; i <= dateRange.length; i++) {
      markedDateObject[dateRange[i]] = {
        selectedDate: true,
        color: '#5948AA10',
        textColor: '#41411',
      };
    }
    //create object fro calendar
    markedDateObject[startDate] = {
      startingDay: true,
      color: '#5948AA',
      textColor: '#FFFFFF',
    };

    markedDateObject[endDate] = {
      endingDay: true,
      color: '#5948AA',
      textColor: '#FFFFFF',
    };
    return markedDateObject;
  };

  const onPress = item => {
    if (markedDatesArray.length < 2) {
      if (markedDatesArray.length === 0) {
        markedDatesArray.push(item.dateString);
        setMarkedDates({
          [markedDatesArray[0]]: {
            selectedDate: true,
            color: '#5948AA',
            textColor: '#FFFFFF',
          },
        });
      } else {
        if (markedDatesArray[0] === item.dateString) {
          setMarkedDates({});
          setMarkedDatesArray([]);
        } else {
          markedDatesArray.push(item.dateString);
          markedDatesArray.sort();
          var selectedDayList = getDaysArray(
            markedDatesArray[0],
            markedDatesArray[1],
          );
          setMarkedDates(selectedDayList);
        }
      }
    } else {
      //reset Calendar Selection
      markedDatesArray.push(item.dateString);
      var filteredDates = markedDatesArray.filter(
        dates => dates === item.dateString,
      );
      setMarkedDatesArray(filteredDates);
      setMarkedDates({
        [filteredDates[0]]: {
          selectedDate: true,
          color: '#5948AA',
          textColor: '#FFFFFF',
        },
      });
    }
  };

  return (
    <View style={style}>
      <Calendar
        accessibilityValue={today.toISOString().substring(0, 10)}
        minDate={today.toISOString().substring(0, 10)}
        onDayPress={day => onPress(day)}
        renderArrow={direction => {
          if (direction === 'right') {
            return <ArrowRight2 size={18} color="#414141" />;
          } else {
            return <ArrowLeft2 size={18} color="#414141" />;
          }
        }}
        hideExtraDays={true}
        monthFormat={'MMM yyyy'}
        disableAllTouchEventsForDisabledDays={true}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={true}
        markingType="period"
        markedDates={markedDates}
        style={calendarStyle}
        theme={{
          arrowColor: '#5E4BA5',
          dayTextColor: '#414141',
          textDayFontFamily: 'Gilroy-SemiBold',
          textDayFontSize: 14,
          textDayStyle: {marginHorizontal: 24, marginVertical: 16},
          monthTextColor: '#5E4BA5',
          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              paddingBottom: 4,
              borderBottomWidth: 1,
              borderColor: '#AB65F1',
            },
            monthText: {
              fontSize: 14,
              fontFamily: 'Gilroy-SemiBold',
              color: '#5E4BA5',
              margin: 0,
            },
            dayHeader: {
              marginTop: 0,
              marginBottom: 0,
              width: 32,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Gilroy-SemiBold',
              color: '#5E4BA5',
            },
          },
        }}
        // dayComponent={({date, state}) => {
        //   return selectedStartDate ? (
        //     <LinearGradient
        //       useAngle={true}
        //       angle={198.02}
        //       colors={['#AB65F1', '#5E4BA5']}
        //       style={tw.style(
        //         'w-8 h-8 items-center justify-center rounded-full ',
        //       )}>
        //       <Text
        //         style={{
        //           textAlign: 'center',
        //           color: state === 'disabled' ? 'gray' : 'white',
        //           fontSize: 14,
        //           fontFamily: 'Gilroy-SemiBold',
        //         }}>
        //         {date.day}
        //       </Text>
        //     </LinearGradient>
        //   ) : (
        //     <Pressable onPress={day => onPress(day)}>
        //       <Text
        //         style={{
        //           textAlign: 'center',
        //           color: state === 'disabled' ? 'gray' : 'black',
        //           fontSize: 14,
        //           fontFamily: 'Gilroy-SemiBold',
        //         }}>
        //         {date.day}
        //       </Text>
        //     </Pressable>
        //   );
        // }}
      />
      <Pressable
        style={tw`border-basicGray border rounded-15 flex-row justify-center items-center py-2.5 mx-10 h-10 mt-3`}
        onPress={() => {
          navigate('TimePickerModal', {
            onSubmit: (selectedStartTime, selectedEndTime) => {
              setStartTime(selectedStartTime);
              setEndTime(selectedEndTime);
            },
          });
        }}>
        <Text style={tw`bv-med-sm mr-6 text-primary`}>
          {startTime ? startTime : '--:-- --'}
        </Text>
        <Text style={tw`bv-med-sm text-grayBorder`}>to</Text>
        <Text style={tw`bv-med-sm ml-6  text-primary`}>
          {endTime ? endTime : '--:-- --'}
        </Text>
      </Pressable>
    </View>
  );
};

export {SpecficTimeCard};
