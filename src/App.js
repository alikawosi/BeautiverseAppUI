import React from 'react';
import {useDeviceContext} from 'twrnc';
import {MenuProvider} from 'react-native-popup-menu';

import Toast, {BaseToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import tw from '../tailwind';
import {api} from './utils';
import Navigation from './Navigation';
import {AuthProvider} from './hooks/useAuth';
import NetworkDisconectedScreen from './screens/NetworkDisconectedScreen';

api.init();
const client = new QueryClient({defaultOptions: {queries: {retry: 2}}});

const App = () => {
  useDeviceContext(tw);

  const netStatus = useNetInfo();
  // if (netStatus.isConnected) {
  //   if (netStatus.isInternetReachable) {
  return (
    <QueryClientProvider client={client}>
      <MenuProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={tw`flex-grow`}>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
              <Toast
                topOffset={30}
                visibilityTime={3000}
                config={{
                  success: props => (
                    <BaseToast {...props} text1Style={tw`tp-body3`} />
                  ),
                  error: props => (
                    <BaseToast {...props} text1Style={tw`tp-body3`} />
                  ),
                }}
              />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
  //   } else {
  //     return <NetworkDisconectedScreen />;
  //   }
  // } else {
  //   return <NetworkDisconectedScreen />;
  // }
};

export default App;
