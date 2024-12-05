import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {ChatCard, SearchBar} from '.';
import {CHAT_CONST} from '../../../constants';
import {DirectInbox} from 'iconsax-react-native';

const MessageTab = () => {
  const {navigate} = useNavigation();
  const listCount = CHAT_CONST.chatListData.length;
  return (
    <FlatList
      style={tw`flex-1`}
      contentContainerStyle={tw.style('', {
        'flex-1': listCount === 0,
      })}
      ListEmptyComponent={
        <View style={tw`flex-1 justify-center items-center`}>
          <DirectInbox size="40" color="#717171" />
          <Text style={tw`bv-heading-lg mt-7`}>Your inbox is empty !</Text>
          <Text style={tw`bv-sans-sm text-center text-grayBorder`}>
            When you book a appointment, messages from your pro will show up
            here.
          </Text>
        </View>
      }
      ListHeaderComponent={listCount !== 0 ? <SearchBar /> : null}
      data={CHAT_CONST.chatListData}
      renderItem={({item}) => (
        <Pressable
          onPress={() =>
            navigate('ChatScreens', {screen: 'Chat', params: {item}})
          }
          onLongPress={() =>
            navigate('SelectModal', {
              label: item.name,
              options: CHAT_CONST.chatActionList,
            })
          }>
          <ChatCard {...item} />
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <View style={tw`w-full h-px bg-black opacity-20 my-4`} />
      )}
      keyExtractor={(item, index) => String(item.id || index)}
      showsVerticalScrollIndicator={false}
    />
  );
};

export {MessageTab};
