import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import tw from '../../../../tailwind';
import {FlexibleTimeData} from '../../../constants';
import {TabBar, TabBarItem} from '../../commons';
import {Tag} from '../../elements';
import {SpecficTimeCard} from './';

const TimeSearchCard = ({style, title, onSubmit = () => false}) => {
  const [dateType, setDateType] = useState('calendar');
  const [flexibleTime, setflexibleTime] = useState(null);
  const [specificTimeSearchOption, setSpecificTimeSearchOption] = useState({});

  useEffect(() => {
    if (flexibleTime || Object.values(specificTimeSearchOption).length) {
      onSubmit({
        date_type: dateType,
        ...(dateType === 'calendar'
          ? specificTimeSearchOption
          : {flexible_time: flexibleTime}),
      });
    }
  }, [dateType, flexibleTime, specificTimeSearchOption]);

  return (
    <View
      style={[tw.style('bg-white py-6 px-2.5 rounded-3xl shadow-md '), style]}>
      <Text
        style={tw`
            bv-heading-sm text-black mb-2.5 mx-7 capitalize text-center`}>
        {title}
      </Text>
      <View style={tw` py-3 w-full items-center `}>
        <TabBar activeItemStyle="rounded-full" style={tw`h-12 rounded-full`}>
          <TabBarItem
            options={{
              key: 1,
              title: 'Exact Time',
              onPress: () => {
                setDateType('calendar');
                setflexibleTime('');
              },
            }}>
            <SpecficTimeCard
              onChange={val => setSpecificTimeSearchOption(val)}
            />
          </TabBarItem>
          <TabBarItem
            options={{
              key: 2,
              title: 'Time Window',
              onPress: () => {
                setDateType('flexible');
                setSpecificTimeSearchOption({});
              },
            }}>
            <View style={tw`flex-wrap flex-row justify-center`}>
              {FlexibleTimeData.map(item => {
                return (
                  <Tag
                    key={item.key}
                    onPress={() => {
                      setflexibleTime(item.value);
                    }}
                    title={item.title}
                    selected={flexibleTime === item.value ? true : false}
                    style={tw`m-1`}
                  />
                );
              })}
            </View>
          </TabBarItem>
        </TabBar>
      </View>
    </View>
  );
};

export {TimeSearchCard};
