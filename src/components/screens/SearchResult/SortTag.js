import React, {useState} from 'react';
import {Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowDown2} from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../../tailwind';

const SortTag = ({
  id,
  title,
  value,
  icon,
  options,
  style,
  containerStyle,
  selected,
  setSelected,
}) => {
  const {navigate} = useNavigation();

  const pressHandler = () => {
    if (options) {
      navigate('SelectModal', {
        options,
        label: 'Sort by',
        onSubmit: ({title, value}) => {
          setSelected({title, value, id});
        },
      });
    } else {
      setSelected(prev => ({
        id,
        value,
        title: prev?.title,
      }));
    }
  };
  return (
    <Pressable
      style={tw.style('', containerStyle)}
      onPress={() => pressHandler()}>
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={
          selected?.id === id ? ['#AB65F1', '#5948AA'] : ['#FFFFFF', '#FFFFFF']
        }
        style={tw.style(
          ' p-2 rounded-xl flex-row justify-center items-center',
          {
            'border-primary border-transparent': selected?.id === id,
          },
          style,
        )}>
        {icon
          ? React.cloneElement(icon, {
              color: selected?.id === id ? '#ffffff' : '#7A7A8A',
            })
          : null}
        <Text
          style={tw.style('bv-med-sm mx-1', {
            'text-white': selected?.id === id,
          })}>
          {options && selected?.title ? selected.title : title}
        </Text>
        {options ? (
          <ArrowDown2
            size={16}
            color={selected?.id === id ? 'white' : '#414141'}
          />
        ) : null}
      </LinearGradient>
    </Pressable>
  );
};

export {SortTag};
