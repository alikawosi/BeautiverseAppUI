import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {CloseCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {searchScreenTabBarData} from '../../../constants';

const SearchScreenTabBar = ({style}) => {
  const {goBack, navigate} = useNavigation();
  const [actvieKey, setActiveKey] = useState(1);

  const onPress = item => {
    setActiveKey(item.key);
    if (item.key === 2) {
      navigate('SearchModal', {
        title: 'Who are you looking for?',
        placeholder: 'Enter professional name',
        type: 'beautician',

        onClose() {
          setActiveKey(1);
        },
      });
    }
  };

  return (
    <View style={tw.style('flex-row flex-1 items-center mt-6', style)}>
      <Pressable style={tw`p-3`} onPress={() => goBack()}>
        <CloseCircle size={24} color="#717171" />
      </Pressable>

      <View style={tw`flex-row flex-1 justify-center`}>
        {searchScreenTabBarData.map(item => {
          return (
            <TouchableOpacity key={item.key} onPress={() => onPress(item)}>
              <View style={tw`mx-3`}>
                <Text
                  style={tw.style('tp-body1 text-lg text-grayBorder', {
                    'border-primary border-b-2 text-primary tp-heading':
                      item.key === actvieKey,
                  })}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export {SearchScreenTabBar};
