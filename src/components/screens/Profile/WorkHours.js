import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../../../tailwind';

const WorkHours = ({data}) => {
  const Item = props => {
    const {day, time, startTime, endTime} = props;
    return (
      <View style={tw`flex-row my-1.5`}>
        <Text style={tw`bv-sans-sm`}>{day}</Text>
        <View style={tw`flex-1 justify-center`}>
          <View style={tw`border border-dashed border-lightGray`} />
        </View>
        {/* {startTime ? (
          <Text style={tw`bv-sans-sm`}>{`${startTime} - ${endTime}`}</Text>
        ) : (
          <Text style={tw`bv-sans-sm`}>closed</Text>
        )} */}
        <Text style={tw`bv-sans-sm`}>{time}</Text>
      </View>
    );
  };
  return (
    <View style={tw`px-5`}>
      {data.map(item => (
        <Item key={item.id} day={item.day_name} time={item.time} />
      ))}
    </View>
  );
};

export {WorkHours};
