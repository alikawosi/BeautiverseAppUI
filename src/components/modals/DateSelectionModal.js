import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';

const DateSelectionModal = () => {
  const [today] = useState(new Date());

  const [markedDates, setMarkedDates] = useState({});

  return (
    <ModalWrapper
      titleSeparator
      title={'Calendar'}
      type="fromBottom"
      style={tw`w-full h-auto bg-white rounded-[30px]`}>
      <View style={tw.style('w-11/12 self-center flex-col')}>
        <Calendar
          accessibilityValue={today.toISOString().substring(0, 10)}
          minDate={today.toISOString().substring(0, 10)}
          // onDayPress={day => onPress(day)}
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
          // style={calendarStyle}
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
        />
      </View>
    </ModalWrapper>
  );
};

export {DateSelectionModal};
