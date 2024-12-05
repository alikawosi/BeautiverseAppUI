import {View, FlatList} from 'react-native';
import React, {useState} from 'react';

import tw from '../../../../tailwind';
import {DateCard} from './DateCard';

const DateSelection = ({data, style, onPress = () => false}) => {
  const today = new Date().getTime();
  const [activeDate, setActiveDate] = useState(today);

  const dateRenderOption = item => {
    return (
      <DateCard
        day={item.name}
        dayNum={item.day}
        disabled={item.disabled}
        today={(item.timestamp * 1000) / today <= 1}
        isSelected={activeDate === item.timestamp}
        onPress={() => onDatePress(item.timestamp)}
      />
    );
  };

  const onDatePress = val => {
    setActiveDate(val);
    onPress(val);
  };

  return (
    <View style={style}>
      <FlatList
        style={tw`flex p-2`}
        data={data}
        renderItem={({item}) => dateRenderOption(item)}
        keyExtractor={(item, index) => String(item.id || index)}
        horizontal
        ItemSeparatorComponent={() => <View style={tw`w-3 h-full`} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export {DateSelection};
