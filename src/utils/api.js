import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {PermissionsAndroid, Platform} from 'react-native';
class Api {
  token = null;
  init() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION');
    }
    axios.defaults.baseURL = 'https://beautiverse.ca/api/beautiverse/client';
    axios.interceptors.request.use(async req => {
      if (this.token) {
        req.headers.Authorization = 'Bearer ' + this.token;
      }
      return req;
    });

    axios.interceptors.response.use(
      async response => {
        let accessToken = await Keychain.getGenericPassword();
        this.token = accessToken.password;

        return response.data;
      },
      error => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }
  instanse() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  handleError = err => {
    const {response, config} = err;
    const originalRequest = config;
    if (response.status === 403 && !originalRequest._retry) {
      console.log('403');
    } else if (typeof response?.data.message === 'string') {
      Toast.show({
        type: 'error',
        text1: response?.data.message,
      });
    } else if (response?.data.errors) {
      let errorText = '';
      Object.values(response?.data.errors).forEach(item => {
        errorText += `${item} \n`;
      });
      Toast.show({
        type: 'error',
        text1: String(errorText),
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Some Problems happened! Please try again later!',
      });
    }
  };
  setAccessToken = token => {
    this.token = token;
  };
}

const api = new Api();

export {api};
