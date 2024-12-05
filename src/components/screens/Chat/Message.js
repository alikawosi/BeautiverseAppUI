import React, {useRef} from 'react';
import {View, Text, Image, ScrollView, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {CHAT_CONST} from '../../../constants';

const Message = ({
  id,
  isMe,
  type,
  content,
  isReply,
  replyBy,
  replyType,
  replyContent,
  time,
  size,
  status,
  onReply = () => {},
}) => {
  const {navigate} = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeToggle = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }).start(),
    );
  };
  const rotate = fadeAnim.interpolate({
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: ['0deg', '10deg', '-10deg', '0deg'],
    extrapolate: 'clamp',
  });

  const rightScrollHandler = OffsetX => {
    if (OffsetX < 0) {
      onReply();
    }
  };
  return (
    <ScrollView
      onScroll={a => rightScrollHandler(a.nativeEvent.contentOffset.x)}
      scrollEventThrottle={0}
      horizontal
      contentContainerStyle={tw`flex-1`}>
      <View
        style={tw.style('w-full', {
          'items-end': isMe,
          'items-start': !isMe,
        })}>
        <Pressable
          //onPress={() => fadeToggle()}
          style={tw.style('rounded-15', {
            'rounded-br-0': isMe,
            'rounded-bl-0': !isMe,
            'border border-basicGray': type === 'image' || 'video',
            //opacity: fadeAnim,
          })}
          onLongPress={() =>
            navigate('SelectModal', {
              options: CHAT_CONST.messageActionList,
            })
          }>
          <LinearGradient
            useAngle={true}
            angle={90.6}
            colors={
              isMe
                ? ['#AB65F1', '#5E4BA5']
                : type !== 'image' && 'video'
                ? ['#F1F1F1', '#F1F1F1']
                : ['#FFFFFF', '#FFFFFF']
            }
            style={tw.style('rounded-15 max-w-[80%]', {
              'rounded-br-0': isMe,
              'rounded-bl-0': !isMe,
              'px-4 py-2': type !== 'image' || 'video',
            })}>
            <Animated.View style={[{transform: [{rotate: rotate}]}]}>
              {isReply ? (
                <View
                  style={tw.style('bg-white px-3 py-1 rounded-xl -mx-2 mb-2', {
                    'rounded-15 mx-0': type === 'image' || 'video',
                  })}>
                  <Text style={tw`bv-sans-sm`}>{replyBy}</Text>
                  {replyType === 'text' ? (
                    <Text style={tw`bv-sans-xs`} numberOfLines={1}>
                      {replyContent}
                    </Text>
                  ) : replyType === 'voice' ? (
                    <Text style={tw`bv-sans-xs`}>Voice Message</Text>
                  ) : replyType === 'image' || 'video' ? (
                    <Text style={tw`bv-sans-xs`}>
                      {replyType === 'image' ? 'Image' : 'Video'}
                    </Text>
                  ) : null}
                </View>
              ) : null}
              <View style={tw``}>
                {type === 'text' ? (
                  <Text
                    style={tw.style('bv-sans-base', {
                      'text-white': isMe,
                    })}>
                    {content}
                  </Text>
                ) : type === 'voive' ? (
                  <Text>Voice</Text>
                ) : type === 'image' ? (
                  <Image
                    style={tw.style('rounded-15', {
                      'rounded-br-0': isMe,
                      'rounded-bl-0': !isMe,
                    })}
                    source={content}
                  />
                ) : null}
              </View>
            </Animated.View>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={tw`justify-center px-4`}>
        <Text style={tw`bv-sans-xs text-grayBorder`}>{`${time}`}</Text>
      </View>
    </ScrollView>
  );
};

export {Message};
