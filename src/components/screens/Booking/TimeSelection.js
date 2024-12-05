import React from 'react';
import {View} from 'react-native';

import tw from '../../../../tailwind';
import {TabBar, TabBarItem} from '../../commons';
import {AvailableTime} from './AvailableTime';

const TimeSelection = ({
  data,
  selectedDate,
  horizontal = true,
  numColumns,
  onTagPress = () => false,
}) => {
  return (
    <View style={tw`flex-1`}>
      <TabBar textStyle={tw`bv-heading-xs`} itemStyle={tw`px-6`}>
        <TabBarItem
          options={{
            title: 'Morning',
            key: 1,
          }}>
          <AvailableTime
            data={data.morning}
            onPress={val => onTagPress(val)}
            selectedDate={selectedDate}
            horizontal={horizontal}
            numColumns={numColumns}
          />
        </TabBarItem>
        <TabBarItem
          options={{
            title: 'Afternoon',
            key: 2,
          }}>
          <AvailableTime
            data={data.afternoon}
            onPress={val => onTagPress(val)}
            selectedDate={selectedDate}
            horizontal={horizontal}
            numColumns={numColumns}
          />
        </TabBarItem>
        <TabBarItem
          options={{
            title: 'Evening',
            key: 2,
          }}>
          <AvailableTime
            data={data.evening}
            onPress={val => onTagPress(val)}
            selectedDate={selectedDate}
            horizontal={horizontal}
            numColumns={numColumns}
          />
        </TabBarItem>
      </TabBar>
    </View>
  );
};

export {TimeSelection};
