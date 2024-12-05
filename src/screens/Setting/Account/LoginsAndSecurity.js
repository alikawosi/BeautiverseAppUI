import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';

import {EmptyScreen} from '../../../components/commons';

const LoginsAndSecurity = () => {
  return (
    <SafeAreaView edges={['bottom']} style={tw` bg-white flex-1 pb-4 px-7 `}>
      <EmptyScreen
        style={tw` flex-1`}
        description={'No Privacy and Policy yet...'}
      />
    </SafeAreaView>
  );
};

export default LoginsAndSecurity;
