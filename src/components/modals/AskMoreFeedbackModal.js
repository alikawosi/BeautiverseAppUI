import React from 'react';
import {Text} from 'react-native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const AskMoreFeedbackModal = () => {
  return (
    <ModalWrapper type="fromBottom" title={'Feedback'} titleSeparator>
      <Text style={tw`bv-heading-sm my-10 text-center`}>
        Do you have more thoughts to share?
      </Text>
      <Button primary title={'Leave A Review'} size={'small'} />
    </ModalWrapper>
  );
};

export {AskMoreFeedbackModal};
