import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';

const MoreInfoModal = ({route}) => {
  const {title, imageList, desc} = route.params;
  return (
    <ModalWrapper
      type="fromBottom"
      title={title}
      titleSeparator
      style={tw`px-0`}>
      <FlatList
        contentContainerStyle={tw`pl-5`}
        data={imageList}
        renderItem={({item}) => (
          <Image style={tw`w-40 h-50 rounded-15`} source={{uri: item.url}} />
        )}
        ItemSeparatorComponent={() => <View style={tw`w-2.5 h-full`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text style={tw`bv-med-base mt-7 px-5`}>{desc}</Text>
    </ModalWrapper>
  );
};

export {MoreInfoModal};
