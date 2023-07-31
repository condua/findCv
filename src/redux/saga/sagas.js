// src/redux/sagas.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, loginSuccess, loginFailure } from '../action/authActions';
import { GET_PROFILE_REQUEST, getProfileSuccess, getProfileFailure, UPDATE_PROFILE_REQUEST, updateProfileSuccess, updateProfileFailure } from '../action/profileActions';
import { GET_EVENTS_REQUEST, } from '../action/eventActions';
import { UPLOAD_AVATAR_REQUEST, uploadAvatarSuccess, uploadAvatarFailure } from '../action/uploadAvatarActions';
import eventSaga from './eventSaga';
import jobSaga from './jobSaga';

function* login(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(loginApi, email, password);
    console.log(response);
    const { data: responseData } = response;
    // const { message: responeMessage } = response;
    // console.log(response);
    // console.log(responeMessage);
    const role = responseData.data.role;
    // console.log(role);
    if (role === "CANDIDATE" || role ==="INTERVIEWER" || role ==="RECRUITER" || role ==="ADMIN") {
      const { message, data , access_token, refresh_token } = responseData;
      yield put(loginSuccess(message, data, access_token, refresh_token));
    } else {
      yield put(loginFailure('Invalid role'));
    }
    
  } catch (message) {
    console.error("Error in login saga:", message);
    yield put(loginFailure('Failed to login'));
  }
}

function* getProfile(action) {
  try {
   
    const { accessToken } = action.payload;
    const response = yield call(getProfileApi, accessToken);
    const { data: responseData } = response;
    console.log(responseData)
    yield put(getProfileSuccess(responseData));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

function loginApi(email, password) {
  return axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/login', {
    email,
    password,
  });
}

function getProfileApi(accessToken) {
  return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
function* uploadAvatar(action) {
    try {
    const { accessToken, avatarFile } = action.payload;
    const formData = new FormData();
    formData.append('file', avatarFile);

    const response = yield call(uploadAvatarApi, accessToken, formData);
    const { data: responseData } = response;
    console.log(responseData)
    const avatarUrl = responseData.avatarUrl;

    yield put(uploadAvatarSuccess(avatarUrl));
  } catch (error) {
    yield put(uploadAvatarFailure('Failed to upload avatar'));
  }
}

function uploadAvatarApi(accessToken, formData) {
  return axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/profile/upload/avatar', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

function* updateProfile(action) {
  try {
    const { accessToken, updatedData } = action.payload;
    console.log("RUNNING HERE",accessToken, updatedData);
    
    const response = yield call(updateProfileApi, accessToken, updatedData);
    const { data: responseData } = response;
    

    // Gọi action updateProfileSuccess khi cập nhật thành công
    yield put(updateProfileSuccess(responseData));

  } catch (error) {
    // Gọi action updateProfileFailure khi cập nhật thất bại
    yield put(updateProfileFailure(error));
  }
}

function updateProfileApi(accessToken, updatedData) {
  return axios.put('https://qltd01.cfapps.us10-001.hana.ondemand.com/profile', updatedData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(UPLOAD_AVATAR_REQUEST, uploadAvatar);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
  yield eventSaga(); 
  yield jobSaga();
}