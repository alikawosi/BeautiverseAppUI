import React, {useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabBar from './TabBarNavigator';
import Auth from './screens/Auth';
import Search from './screens/Search';
import Booking from './screens/Booking';
import Profile from './screens/Profile';
import SettingScreens from './screens/Setting';
import Referrals from './screens/Setting/Referral/Referrals';
import ChatScreens from './screens/Chat';
import Review from './screens/Review';
import Subscribe from './screens/Subscribe';
import {
  DatePickerModal,
  SelectModal,
  SetPhotoModal,
  SelectAddressModal,
  AddAddressModal,
  SearchModal,
  TimePickerModal,
  TimeSelectionModal,
  FilterModal,
  DateSelectionModal,
  SelectServiceModal,
  AddPhotoModal,
  SuccessedModal,
  AboutMeModal,
  FormModal,
  SelectNotificationModal,
  FAQModal,
  InfoModal,
  MoreInfoModal,
  AppointmentCalendarModal,
  FeedbackModal,
  AskMoreFeedbackModal,
  TipModal,
  ConfirmPhoneNumberModal,
  SelectPaymentCardModal,
  PhotoPickerModal,
  AddPaymentMethodModal,
} from './components/modals';

import Test from './screens/Test/Test';
import {useAuth} from './hooks/useAuth';
import {ScreenHeader} from './components/commons';
import SplashScreen from './screens/SplashScreen';
import UserProfileSetting from './screens/Setting/UserProfile';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {state} = useAuth();
  const checkUser = useAuth();
  useEffect(() => {
    (async () => {
      try {
        checkUser.checkUser();
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log('loggedIn');
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);
  if (state.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <Stack.Navigator // initialRouteName="Test"
        screenOptions={() => ({
          header: props => <ScreenHeader {...props} />,
          headerShown: false,
        })}>
        {!state.isLogin ? (
          <Stack.Screen name="Auth" component={Auth} />
        ) : (
          <>
            <Stack.Screen name="TabBar" component={TabBar} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChatScreens" component={ChatScreens} />
            <Stack.Screen name="Subscribe" component={Subscribe} />
            <Stack.Screen
              name="UserProfileSetting"
              component={UserProfileSetting}
            />
            <Stack.Screen
              name="Referrals"
              component={Referrals}
              options={{headerShown: true, title: 'Referrals'}}
            />
            <Stack.Screen name="SettingScreens" component={SettingScreens} />
            <Stack.Screen name="Review" component={Review} />
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
              }}>
              <Stack.Screen name="SearchModal" component={SearchModal} />
              <Stack.Screen
                name="TimePickerModal"
                component={TimePickerModal}
              />
              <Stack.Screen
                name="TimeSelectionModal"
                component={TimeSelectionModal}
              />
              <Stack.Screen
                name="DateSelectionModal"
                component={DateSelectionModal}
              />
              <Stack.Screen
                name="SelectAddressModal"
                component={SelectAddressModal}
              />
              <Stack.Screen
                name="SelectServiceModal"
                component={SelectServiceModal}
              />
              <Stack.Screen name="SuccessedModal" component={SuccessedModal} />
              <Stack.Screen name="AddPhotoModal" component={AddPhotoModal} />
              <Stack.Screen
                name="AddAddressModal"
                component={AddAddressModal}
              />
              <Stack.Screen name="FilterModal" component={FilterModal} />
              <Stack.Screen name="AboutMe" component={AboutMeModal} />
              <Stack.Screen name="FormModal" component={FormModal} />
              <Stack.Screen
                name="SelectNotificationModal"
                component={SelectNotificationModal}
              />
              <Stack.Screen name="FAQModal" component={FAQModal} />
              <Stack.Screen name="InfoModal" component={InfoModal} />
              <Stack.Screen name="MoreInfoModal" component={MoreInfoModal} />
              <Stack.Screen
                name="AppointmentCalendarModal"
                component={AppointmentCalendarModal}
              />
              <Stack.Screen name="FeedbackModal" component={FeedbackModal} />
              <Stack.Screen
                name="AskMoreFeedbackModal"
                component={AskMoreFeedbackModal}
              />
              <Stack.Screen name="TipModal" component={TipModal} />
              <Stack.Screen
                name="PhotoPickerModal"
                component={PhotoPickerModal}
              />
              <Stack.Screen
                name="AddPaymentMethodModal"
                component={AddPaymentMethodModal}
              />
            </Stack.Group>
          </>
        )}

        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
          }}>
          <Stack.Screen name="DatePickerModal" component={DatePickerModal} />
          <Stack.Screen name="SetPhotoModal" component={SetPhotoModal} />
          <Stack.Screen name="SelectModal" component={SelectModal} />
          <Stack.Screen
            name="SelectPaymentCardModal"
            component={SelectPaymentCardModal}
          />
          <Stack.Screen
            name="ConfirmPhoneNumberModal"
            component={ConfirmPhoneNumberModal}
          />
        </Stack.Group>
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    );
  }
};
export default Navigation;
