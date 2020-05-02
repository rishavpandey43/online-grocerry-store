import axios from 'axios';
import {ToastAndroid} from 'react-native';

import * as actionTypes from '../types/actionTypes';

import {storeDataInAsync, removeDataFromAsync} from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

export const getTokenFromAsync = token => {
  return {
    type: actionTypes.GET_TOKEN,
    token,
  };
};

export const registerRequest = () => {
  return {
    type: actionTypes.REGISTER_REQUEST,
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

export const registerFailure = () => {
  return {
    type: actionTypes.REGISTER_FAILURE,
  };
};

export const registerFetch = (fcmDeviceToken, data) => dispatch => {
  dispatch(registerRequest());

  axios
    .post(baseUrl + '/customer/register', data, {
      params: {
        fcmDeviceToken,
      },
    })
    .then(res => {
      storeDataInAsync('eSamagri_customer_auth_token', res.data.token);
      ToastAndroid.show('Registration Successfull', ToastAndroid.SHORT);
      dispatch(registerSuccess({token: res.data.token}));
    })
    .catch(err => {
      ToastAndroid.show(
        err.response.data.errMessage || 'Some error occured, try again.',
        ToastAndroid.LONG,
      );
      dispatch(
        registerFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const loginFailure = () => {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
};

export const loginFetch = (fcmDeviceToken, {phone, otp}) => dispatch => {
  dispatch(loginRequest());

  axios
    .get(baseUrl + '/customer/login', {
      params: {
        fcmDeviceToken,
        phone,
        otp,
      },
    })
    .then(res => {
      storeDataInAsync('eSamagri_customer_auth_token', res.data.token);
      ToastAndroid.show('Login Successfull', ToastAndroid.LONG);
      dispatch(loginSuccess({token: res.data.token}));
    })
    .catch(err => {
      ToastAndroid.show(
        err.response.data.errMessage || 'Some error occured, try again.',
        ToastAndroid.LONG,
      );
      dispatch(
        loginFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
  };
};

export const logoutFetch = token => dispatch => {
  dispatch(logoutRequest());
  axios
    .get(baseUrl + '/customer/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      removeDataFromAsync('eSamagri_customer_auth_token')
        .then(response => {
          dispatch(logoutSuccess());
        })
        .catch(err => {
          dispatch(logoutFailure());
        });
    })
    .catch(err => {
      ToastAndroid.show(
        err.response.data.errMessage || 'Some error occured, try again.',
        ToastAndroid.LONG,
      );
      dispatch(logoutFailure());
    });
};