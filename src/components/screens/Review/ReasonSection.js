import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {SortTag} from '../SearchResult';

const ReasonSection = ({
  sectionTitle,
  countStyle,
  data,
  style,
  headerStyle,
  headerTitleStyle,
  bodyStyle,
}) => {
  const [activeTag, setActiveTag] = useState([]);

  const tagPressHandler = id => {
    let tempList = [...activeTag];
    if (tempList.includes(id)) {
      var filteredList = tempList.filter(p => p !== id);
      setActiveTag(filteredList);
    } else {
      if (tempList.length === 3) {
        //
      } else {
        tempList.push(id);
        setActiveTag(tempList);
      }
    }
  };

  return (
    <View style={tw.style('w-full', style)}>
      <View
        style={tw.style('flex-row items-center justify-between', headerStyle)}>
        <Text style={tw.style('bv-heading-xl', headerTitleStyle)}>
          {sectionTitle}
        </Text>
        <Text style={tw.style('bv-sans-sm text-primary', countStyle)}>
          {`${activeTag.length}/3`}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={tw.style('pt-4', bodyStyle)}
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <SortTag
            onPress={() => tagPressHandler(item.id)}
            {...item}
            isActive={activeTag.includes(item.id) ? true : false}
            style={tw`w-40 px-0 py-2`}
          />
        )}
        columnWrapperStyle={tw`justify-between`}
        ItemSeparatorComponent={() => <View style={tw`h-4`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export {ReasonSection};
