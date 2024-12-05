import React from 'react';
import {View, Text} from 'react-native';
import {Button, ModalWrapper} from '../commons';

import tw from '../../../tailwind';

const InfoModal = ({route}) => {
  const {
    title,
    submitButtonTitle,
    onSubmit,
    cancelButtonTitle,
    onCancel,
    desc1,
    desc2,
  } = route.params;
  return (
    <ModalWrapper type="fromBottom" title={title} titleSeparator>
      <View style={tw`mb-6`}>
        <View style={tw`mb-6 items-center`}>{desc1}</View>
        {desc2 ? <View>{desc2}</View> : null}
      </View>
      <View style={tw`flex-row`}>
        {cancelButtonTitle ? (
          <Button
            secondary
            containerStyle={tw`flex-1 mr-1`}
            style={tw`items-center px-0 h-12`}
            title={cancelButtonTitle}
            titleStyle={tw`bv-heading-base`}
            onPress={onCancel}
          />
        ) : null}
        {submitButtonTitle ? (
          <Button
            primary
            containerStyle={tw`flex-1 ml-1`}
            style={tw`items-center px-0 h-12`}
            title={submitButtonTitle}
            titleStyle={tw`bv-heading-base`}
            onPress={onSubmit}
          />
        ) : null}
      </View>
    </ModalWrapper>
  );
};

export {InfoModal};
