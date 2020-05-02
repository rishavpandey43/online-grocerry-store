import axios from 'axios';
import {ToastAndroid} from 'react-native';
import * as actionTypes from '../types/actionTypes';

import * as helper from '../../../utils/helper';
import {baseUrl} from '../../../utils/constant';

export const getProfileRequest = () => {
  return {
    type: actionTypes.GET_PROFILE_REQUEST,
  };
};

export const getProfileSuccess = response => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile: response.profile,
    message: response.message,
  };
};

export const getProfileFailure = response => {
  return {
    type: actionTypes.GET_PROFILE_FAILURE,
    message: response.message,
  };
};

export const getProfileFetch = token => dispatch => {
  dispatch(getProfileRequest());
  axios
    .get(baseUrl + '/customer/get-customer', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getProfileSuccess({profile: {...res.data.customer}}));
    })
    .catch(err => {
      dispatch(
        getProfileFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};

export const updateProfileRequest = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_REQUEST,
  };
};

export const updateProfileSuccess = response => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    profile: response.profile,
  };
};

export const updateProfileFailure = response => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAILURE,
    message: response.message,
  };
};

export const updateProfileFetch = (token, data, dataType) => dispatch => {
  let newData = {
    data,
    dataType,
  };
  dispatch(updateProfileRequest());
  axios
    .put(baseUrl + '/customer/update-customer', newData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(updateProfileSuccess({profile: {...res.data.customer}}));
      ToastAndroid.show(
        'Your profile detail has been updated succesfully, please back to your profile',
        ToastAndroid.LONG,
      );
    })
    .catch(err => {
      dispatch(
        updateProfileFailure({
          message: err.response
            ? err.response.data.errMessage || 'Internal Server Error'
            : 'Internal Server Error',
        }),
      );
    });
};