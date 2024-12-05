import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {useMutation} from 'react-query';
import {LoginManager} from 'react-native-fbsdk';
import {SafeAreaView} from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

import tw from '../../../tailwind';
import {Button, Input} from '../../components/commons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {AUTH_CONST, GENERAL_CONST} from '../../constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AuthLogin = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');
  const {navigate} = useNavigation();

  const mutation = useMutation({
    mutationFn: () =>
      axios.post('https://beautiverse.ca/api/beautiverse/otp/send', {
        country_code: '+1',
        phone: phoneNumber,
      }),
    onSuccess: () => {
      setIsLoading(false);
      navigate('Auth', {
        screen: 'Verify',
        params: {
          countryCode: '+1',
          phoneNumber: phoneNumber,
          maskedPhoneNumber: maskedPhoneNumber,
        },
      });
    },
    onError: () => {
      setIsLoading(false);
      Toast.show({
        topOffset: Platform.OS === 'ios' ? 80 : 40,
        type: 'error',
        text1: 'Something went worng!',
        text2: 'Please try again later.',
      });
    },
  });

  const onGoogleButtonPress = () => {
    // GoogleSignin.configure({
    //   androidClientId:
    //     '216873909371-cak05decgfqb0d4k95vu7vfkc0n1onue.apps.googleusercontent.com',
    //   iosClientId:
    //     '216873909371-c2p290s08rqj4glhuvska1h06ca3emng.apps.googleusercontent.com',
    // });
    // GoogleSignin.signOut();
    // GoogleSignin.hasPlayServices()
    //   .then(hasPlayService => {
    //     if (hasPlayService) {
    //       GoogleSignin.signIn()
    //         .then(userInfo => {
    //           navigate('ConfirmPhoneNumberModal', {
    //             ...userInfo.user,
    //           });
    //         })
    //         .catch(e => {
    //           console.log('ERROR IS: ' + JSON.stringify(e));
    //         });
    //     }
    //   })
    //   .catch(e => {
    //     console.log('ERROR IS: ' + JSON.stringify(e));
    //   });
  };

  const onAppleButtonPress = () => {
    return appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      .then(appleAuthRequestResponse => {
        let {identityToken, fullName, email} = appleAuthRequestResponse;
      });
    // console.log('DONE');
    // // retrieve identityToken from sign in request
    // const {identityToken} = appleAuthRequestResponse;
    // console.log('data', appleAuthRequestResponse);
  };

  const onFacebookButtonPress = () => {
    LoginManager.setLoginBehavior('native_with_fallback');
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_birthday',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          let userInfo = result.grantedPermissions.map(item => {
            return {
              title: item,
            };
          });
          console.log(userInfo);
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const OAuthSignIn = id => {
    if (id === 'google') {
      onGoogleButtonPress();
    }
    if (id === 'fb') {
      onFacebookButtonPress();
    }
    if (id === 'apple') {
      // config here

      onAppleButtonPress();
    }
  };

  return (
    <SafeAreaView style={tw`flex-grow px-8 bg-white`}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={180}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex-grow justify-center`}>
          <View style={tw`items-center mb-10`}>
            <Image
              style={tw`h-32 w-32 mb-2`}
              resizeMode="contain"
              source={require('../../assets/media/logoWithoutText.png')}
            />
            <Text style={tw`bv-med-lg`}>Welcome To</Text>
            <Text style={tw`tp-titleBranch text-4.5xl text-primary my-2`}>
              Beautiverse
            </Text>
            <Text style={tw`bv-heading-lg text-primary text-center text-xl`}>
              Log In or Sign Up
            </Text>
          </View>
          <Input
            label="Phone number"
            keyboardType="phone-pad"
            formValue={phoneNumber}
            mask={[
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            maxLength={14}
            textInputStyle={tw.style('text-primary bv-heading-sm leading-none')}
            onChange={(val, maskedVal) => {
              setMaskedPhoneNumber(maskedVal);
              setPhoneNumber(val.replace(/\b0+/g, ''));
              if (val?.length === 10) {
                Keyboard.dismiss();
              }
            }}
            preffix={
              <Text style={tw`bv-heading-sm text-primary leading-none`}>
                +1
              </Text>
            }
          />
          <View style={tw`items-center justify-center flex-row my-6`}>
            <LinearGradient {...GENERAL_CONST.orLineProps} />
            <Text
              adjustsFontSizeToFit
              style={tw` px-2 bv-med-base z-20 text-grayBorder`}>
              OR
            </Text>
            <LinearGradient {...GENERAL_CONST.orLineProps} />
          </View>
          <View style={tw`flex-row justify-center mb-5`}>
            {AUTH_CONST.socialsIcon.map(item =>
              Platform.OS !== 'ios' && item.id === 'apple' ? null : (
                <Pressable
                  onPress={() => OAuthSignIn(item.id)}
                  key={item.id}
                  style={tw`bg-white mx-2.5 p-2.5 shadow-lg rounded-full`}>
                  <Image style={tw`h-8 w-8`} source={item.image} />
                </Pressable>
              ),
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        primary
        title="Continue"
        onPress={() => {
          setIsLoading(true);
          Keyboard.dismiss();
          mutation.mutate(phoneNumber);
        }}
        disabled={phoneNumber?.length !== 10}
        loading={isLoading}
        containerStyle={tw`mb-4`}
      />
    </SafeAreaView>
  );
};

export default AuthLogin;
