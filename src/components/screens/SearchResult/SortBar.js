import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {SortTag} from './SortTag';
import {SortBarData, FilterSelectModalData} from '../../../constants';

const SortBar = ({setSearchoptions, style}) => {
  const data = SortBarData;
  const [selected, setSelected] = useState({
    title: data[1].title,
    id: data[1].id,
    value: FilterSelectModalData[0].value,
  });

  useEffect(() => {
    if (selected.value) {
      setSearchoptions(prev => ({...prev, sort: selected.value}));
    }
  }, [selected]);

  return (
    <FlatList
      contentContainerStyle={tw`pr-5`}
      style={tw.style(`ml-5`, style)}
      data={data}
      renderItem={({item}) => (
        <SortTag {...item} selected={selected} setSelected={setSelected} />
      )}
      ItemSeparatorComponent={() => <View style={tw`w-2 h-full`} />}
      keyExtractor={(item, index) => String(item.key || index)}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export {SortBar};
