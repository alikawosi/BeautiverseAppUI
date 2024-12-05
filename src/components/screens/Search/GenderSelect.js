import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {ArrowDown2, Man, Woman} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {GENERAL_CONST} from '../../../constants';

const GenderSelect = ({
  style,
  inputStyle,
  options = GENERAL_CONST.GenderData,
  onSubmit = () => false,
}) => {
  const {navigate} = useNavigation();
  options = [
    {
      id: 4,
      title: 'All',
      value: 'all',
    },
    ...options,
  ];
  const [value, setValue] = useState(options[0]);

  return (
    <Pressable
      style={tw.style('flex-row items-center', style)}
      onPress={() => {
        navigate('SelectModal', {
          type: 'fromBottom',
          options: options,
          label: 'Gender',
          onSubmit: val => {
            setValue(val);
            onSubmit(val);
          },
        });
      }}>
      <Text style={tw`bv-sans-xs`}>Gender</Text>
      <View
        style={tw.style(
          'flex-row items-center  border-basicGray border rounded-10 p-1.5 ml-2 min-w-15',
          inputStyle,
        )}>
        {value?.icon ? (
          value.icon
        ) : (
          <Text style={tw`text-black text-[13.5px]`}>{value?.title}</Text>
        )}
        <ArrowDown2 size="16" color="#717171" style={tw`ml-1`} />
      </View>
    </Pressable>
  );
};

export {GenderSelect};
