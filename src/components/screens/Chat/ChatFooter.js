import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import {Button} from '../../commons';
import {Link2, Microphone2, Send} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const ChatFooter = ({buttonPressHandler = () => {}}) => {
  const [message, setMessage] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition),
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        );

      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setRecordSecs(0);

    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={tw`flex-row px-5 my-4`}>
        <View
          style={tw`flex-1 flex-row border border-basicGray rounded-20 items-center px-4 mr-2`}>
          <TextInput
            placeholder="Type Something..."
            style={tw`flex-1 max-h-72`}
            multiline
            value={message}
            onChangeText={setMessage}
            //numberOfLines={6}
          />
          <Pressable style={tw`w-1/12 self-end pb-3`}>
            <Link2 size={18} color="#717171" />
          </Pressable>
        </View>
        <View style={tw`w-2/12 justify-end`}>
          <Button
            onPress={() => {
              buttonPressHandler(message);
              setMessage('');
            }}
            primary
            style={tw`items-center px-0`}
            icon={
              message ? (
                <Send size={30} color="#FFFFFF" />
              ) : (
                <Microphone2
                  size={30}
                  color="#FFFFFF"
                  onPress={() => onStartRecord}
                />
              )
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export {ChatFooter};
