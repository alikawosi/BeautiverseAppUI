import React, {useRef, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CloseCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {CHAT_CONST} from '../../constants';
import {Message, ChatFooter, ChatHeader} from '../../components/screens/Chat';

const Chat = ({route}) => {
  const Separator = props => {
    const {style} = props;
    return (
      <View
        style={tw.style('border-t border-black w-full opacity-10', style)}
      />
    );
  };

  const scroll = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatList, setChatList] = useState(CHAT_CONST.messageList);
  const [isReply, setIsReply] = useState(false);
  const [message, setMessage] = useState({
    id: null,
    isMe: null,
    type: null,
    content: null,
    isReply: null,
    replyBy: null,
    replyType: null,
    replyContent: null,
    time: null,
    size: null,
    status: null,
  });

  const addMessage = newMessage => {
    let tempList = [...chatList];
    let lastIndex = tempList.findIndex(
      a => tempList[tempList.length - 1].id === a.id,
    );
    let obj = {
      id: lastIndex + 2,
      isMe: true,
      type: 'text', //text, voice, image, video
      content: newMessage,
      isReply: isReply,
      replyBy: message.replyBy,
      replyType: message.replyType,
      replyContent: message.replyContent,
      time: '10:23 PM',
      size: '',
      status: '',
    };
    tempList.push(obj);
    setChatList(tempList);
    setIsReply(false);
    scroll.current.scrollToIndex({
      animated: true,
      index: 0,
    });
  };

  const activeReplyBox = item => {
    setSelectedMessage(item);
    setIsReply(true);
    let tempObj = {...message};
    tempObj.isReply = true;
    tempObj.replyBy = item.isMe ? 'You' : route.params.item.name;
    tempObj.replyType = item.type;
    tempObj.replyContent = item.content;
    setMessage(tempObj);
  };

  const scrollToReplyedMessage = () => {
    scroll.current.scrollToItem({
      animated: true,
      item: selectedMessage,
    });
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ChatHeader {...route.params.item} />
      <Separator />
      <FlatList
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        contentContainerStyle={tw`px-5 py-3`}
        style={tw`flex-1`}
        keyExtractor={(item, index) => String(item.id || index)}
        data={chatList.sort((a, b) => {
          return b.id - a.id;
        })}
        ref={scroll}
        // ListEmptyComponent={renderEmpty()}
        renderItem={({item}) => (
          <Message {...item} onReply={() => activeReplyBox(item)} />
        )}
        showsVerticalScrollIndicator={false}
        inverted
        ItemSeparatorComponent={() => <View style={tw`h-3 w-full`} />}
      />
      {isReply && (
        <View style={tw`bg-white shadow-lg px-5 py-2 rounded-t-15`}>
          <View
            style={tw`bg-[#F0F0F0] rounded-xl px-3 py-2 flex-row justify-between items-center`}>
            <Pressable
              onPress={() => scrollToReplyedMessage()}
              style={tw`w-11/12`}>
              <Text style={tw`bv-sans-sm`}>{message.replyBy}</Text>
              {message.replyType === 'text' ? (
                <Text style={tw`bv-sans-xs`} numberOfLines={1}>
                  {message.replyContent}
                </Text>
              ) : message.replyType === 'voice' ? (
                <Text style={tw`bv-sans-xs`}>Voice Message</Text>
              ) : message.replyType === 'image' || 'video' ? (
                <Text style={tw`bv-sans-xs`}>
                  {message.replyType === 'image' ? 'Image' : 'Video'}
                </Text>
              ) : null}
            </Pressable>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`w-1/12`}
              onPress={() => setIsReply(false)}>
              <View>
                <CloseCircle color="#717171" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Separator />
      <ChatFooter
        buttonPressHandler={newMessage => {
          addMessage(newMessage);
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;
