import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {REVIEW_CONST} from '../../constants';
import {Button, ModalWrapper} from '../commons';
import {SortTag} from '../screens/SearchResult';
import {Tag} from '../elements';

const TipModal = () => {
  const {navigate} = useNavigation();
  const [selectedAmount, setSelectedAmount] = useState(0);
  return (
    <ModalWrapper
      type="fromBottom"
      title={'Tip'}
      titleSeparator
      style={tw`px-5`}>
      <Text style={tw`bv-heading-sm my-6 text-center`}>
        Do you want to pay a tip?
      </Text>
      <ScrollView
        contentContainerStyle={tw`justify-center w-full`}
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mb-6`}>
        {REVIEW_CONST.TipData.map(item => {
          return (
            <Tag
              onPress={() => {
                item.title === 'Custom'
                  ? navigate('FormModal', {
                      title: 'Custom',
                      EditMode: false,
                      formData: [
                        {
                          name: 'customGiftCardAmount',
                          type: 'input',
                          label: 'Custom',
                          keyboardType: 'numeric',
                        },
                      ],
                    })
                  : null;
                setSelectedAmount(item.id);
              }}
              title={item.title}
              selected={selectedAmount === item.id ? true : false}
            />
          );
        })}
      </ScrollView>
      <View style={tw`justify-between flex-row`}>
        <Text style={tw`bv-sans-sm text-grayBorder`}>Tip Price:</Text>
        <Text style={tw`bv-heading-sm`}>{`$${13}`}</Text>
      </View>
      <Button
        containerStyle={tw`mt-6`}
        primary
        title={'Confirm'}
        size={'small'}
      />
    </ModalWrapper>
  );
};

export {TipModal};
