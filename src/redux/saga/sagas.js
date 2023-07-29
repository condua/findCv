// src/redux/sagas.js
import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, loginSuccess, loginFailure } from '../action/authActions';
import { GET_PROFILE_REQUEST, getProfileSuccess, getProfileFailure } from '../action/profileActions';
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
    // Xử lý dữ liệu trả về nếu cần
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



export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield all([
    jobSaga(), 
    eventSaga()
  ]);
}