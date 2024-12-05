import {Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {SectionWrapper} from '../../../elements';

const NotificationType = ({title, seprator}) => {
  const [activeType, setActiveType] = useState('Deactive');
  const {navigate} = useNavigation();

  const setNotificationType = notificationType => {
    Object.keys(notificationType).forEach(key => {
      if (!notificationType[key]) {
        delete notificationType[key];
      }
    });
    if ((Object.keys(notificationType).length = 0)) {
      setActiveType('Deactive');
    } else {
      setActiveType('on' + ' ' + Object.keys(notificationType).join());
    }
  };
  return (
    <SectionWrapper
      title={title}
      description="Edit"
      seperator={seprator}
      descriptionStyle={tw`underline`}
      onDescriptionPress={() =>
        navigate('SelectNotificationModal', {
          onSubmit: notificationType => {
            setNotificationType(notificationType);
          },
        })
      }
      style={tw`mb-6`}
      contentStyle={tw`mb-6`}>
      <Text style={tw`bv-med-sm text-grayBorder`}>{activeType}</Text>
    </SectionWrapper>
  );
};

export {NotificationType};
