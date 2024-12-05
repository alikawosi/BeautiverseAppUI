import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Accordion, Button} from '../../components/commons';
import {ChatHeader} from '../../components/screens/Chat';
import {CHAT_CONST} from '../../constants';

const ChatFAQ = ({route}) => {
  const {navigate} = useNavigation();
  const Separator = props => {
    const {style} = props;
    return (
      <View
        style={tw.style('border-t border-black w-full opacity-10', style)}
      />
    );
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ChatHeader {...route.params.item} />
      <Separator />
      <FlatList
        contentContainerStyle={tw`px-5 pt-4 flex-1`}
        data={CHAT_CONST.chatFAQList}
        renderItem={({item}) => (
          <Accordion
            title={item.title}
            style={tw`border border-basicGray rounded-xl justify-center p-3`}>
            <Text style={tw`bv-med-sm text-grayBorder`}>{item.desc}</Text>
          </Accordion>
        )}
        ItemSeparatorComponent={() => <View style={tw`w-full h-4`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        showsVerticalScrollIndicator={false}
      />
      <Separator />
      <Button
        primary
        containerStyle={tw`mx-5 mt-4`}
        style={tw`items-center px-0 h-12`}
        title={'Message'}
        titleStyle={tw`bv-heading-base`}
        onPress={() => navigate('Chat', {item: {...route.params.item}})}
      />
    </SafeAreaView>
  );
};

export default ChatFAQ;
