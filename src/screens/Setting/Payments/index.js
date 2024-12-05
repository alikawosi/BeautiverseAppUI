import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaymentsMenu from './PaymentsMenu';
import TransactionHistory from './TransactionHistory';
import PaymentMethods from './PaymentMethods';
import {BackButton, ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const PaymentsSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="PaymentsMenu"
        component={PaymentsMenu}
        options={{title: 'Payments'}}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{title: 'Transaction History'}}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{title: 'Payment Methods'}}
      />
    </Stack.Navigator>
  );
};

export default PaymentsSetting;
