import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';

const AboutMeModal = ({route}) => {
  const {data, desc} = route.params;

  const Item = props => {
    const {title, icon} = props;
    return (
      <View style={tw`flex-row items-center w-1/2`}>
        {icon ? icon : null}
        <Text style={tw`ml-2`}>{title}</Text>
      </View>
    );
  };

  return (
    <ModalWrapper type="fromBottom" title={'About Me'} titleSeparator>
      <View style={tw`bg-[#f1f1f1] w-full h-auto rounded-20 p-5 mb-5`}>
        <View style={tw`flex-row flex-wrap content-between`}>
          {data?.map(item => (
            <Item key={item.id} title={item.title} icon={item.icon} />
          ))}
        </View>
      </View>
      <Text style={tw`bv-reg-base mt-1 px-1`}>{desc}</Text>
    </ModalWrapper>
  );
};

export {AboutMeModal};
