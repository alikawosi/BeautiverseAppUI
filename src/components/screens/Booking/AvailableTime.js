import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';

import tw from '../../../../tailwind';
import {Button} from '../../commons';
import {Tag} from '../../elements';
import dayjs from 'dayjs';

const AvailableTime = ({
  data,
  horizontal = true,
  numColumns,
  selectedDate,
  onPress = () => false,
}) => {

  const [activeIndex, setActiveIndex] = useState('');

  const timeRenderOption = item => {
    return (
      <Tag
        selected={activeIndex === item}
        title={dayjs(item * 1000 + selectedDate * 1000).format('HH:mm')}
        onPress={() => {
          setActiveIndex(item);
          onPress(item);
        }}
      />
    );
    // return (

    // );
  };
  return (
    <View style={tw`flex-1`}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          style={tw`flex p-2`}
          numColumns={numColumns}
          contentContainerStyle={tw`items-center`}
          renderItem={({item}) => timeRenderOption(item)}
          keyExtractor={(item, index) => String(index)}
          horizontal={horizontal}
          ItemSeparatorComponent={() => (
            <View
              style={tw.style('w-2 h-full', {' w-full h-2': !horizontal})}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={tw` justify-center mb-4  `}>
          <Text style={tw`bv-reg-sm  mx-2 text-black text-center mt-5`}>
            Ooops! there is no available ime! Try another day!
          </Text>
          {/* <View style={tw`flex-row justify-center items-center`}>
            <Button
              title={'Go To , ' + offerdedDate}
              titleStyle={tw`bv-sans-xs`}
              style={tw`border border-basicGray rounded-10 h-auto p-2.5 `}
            />
            <Text style={tw`bv-reg-xs text-black capitalize mx-2 `}>Or</Text>
            <Button
              title={'Join Waitlist'}
              titleStyle={tw`capitalize underline bv-med-xs `}
              defaultColor={'#5948AA'}
            />
          </View> */}
        </View>
      )}
    </View>
  );
};

export {AvailableTime};
