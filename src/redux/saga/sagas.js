// src/redux/sagas.js
import { takeLatest, call, put, select,all } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, loginSuccess, loginFailure } from '../action/authActions';
// import { GET_PROFILE_REQUEST, getProfileSuccess, getProfileFailure } from '../action/profileActions';
import { REGISTER_REQUEST, registerSuccess, registerFailure } from "../action/registerActions";
import {FETCH_USERNAMES, fetchUsernamesSuccess, fetchUsernamesFailure } from '../action/getUserAction';
import { GET_PROFILE_REQUEST,UPDATE_PROFILE_REQUEST, getProfileSuccess, getProfileFailure,updateProfileFailure,updateProfileSuccess } from '../action/profileActions';
import { UPLOAD_AVATAR_REQUEST, uploadAvatarSuccess, uploadAvatarFailure } from '../action/uploadAvatarActions';
import { GET_EVENTS_REQUEST, } from '../action/eventActions';

import { Button, message } from 'antd';
import { Navigate } from 'react-router-dom';
import { push } from 'react-router-redux'; 
import eventSaga from './eventSaga';
import jobSaga from './jobSaga';
import {
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from '../action/userAction';




const apiUrl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/profile'; // Replace with your actual API URL
function* login(action) {
  try {
    const { email, password } = action.payload;
    // console.log(1)
    const response = yield call(loginApi, email, password);
    // console.log(response);
    const { data: responseData } = response;
    // const { message: responeMessage } = response;
    // console.log(response);
    // console.log(responeMessage);
    if(response.status !== 200)
    {
      yield put(loginFailure)
    }
    const role = responseData.data.role;
    // console.log(role);
    if (role === "CANDIDATE" || role ==="INTERVIEWER" || role ==="RECRUITER" || role ==="ADMIN") {
      const { message, data , access_token, refresh_token } = responseData;
      yield put(loginSuccess(message, data, access_token, refresh_token));
    } else {
      yield put(loginFailure('Invalid role'));
    }
    
  } catch (error) {
    console.error("Error in login saga:", error);
    // alert('Tài khoản hoặc mật khẩu không chính xác')
    yield put(loginFailure(error.response.request.status)); 
  }
}
function* registerUser(action) {
  try {
    // Making the API call using Axios
    const {username, email, password} = action.payload
    const response = yield call(registerAPI, username, email, password);
    const { data: responseData } = response;

    const { message, data , access_token, refresh_token } = responseData;

    yield put(registerSuccess(message, data , access_token, refresh_token));
    alert("Tài khoản đã đăng kí thành công");

    push('/verify')

  } catch (error) {
    console.error(error)
    console.log(error.response)
    console.log(error.response.request.status)
    if(error.response.data.message === "Email already exists!")
    {
      message.error({
        content: 'Email đã tồn tại',

      });
    }
    if(error.response.data.message === "Username already exists!")
    {
      message.error({
        content: 'Username đã tồn tại',

      });
    }

    yield put(registerFailure(error.response.data));
  }
}


// function* getProfile(action) {
//   try {
   
//     const { accessToken } = action.payload;
//     const response = yield call(getProfileApi, accessToken);
//     const { data: responseData } = response;
//     // Xử lý dữ liệu trả về nếu cần
//     yield put(getProfileSuccess(responseData));
//   } catch (error) {
//     yield put(getProfileFailure(error));
//   }
// }

function* getUser(action){
  try {
    const { accessToken } = action.payload;
    const response = yield call(getUserApi, accessToken);
    yield put(fetchUsernamesSuccess(response));
  } catch (error) {
    yield put(fetchUsernamesFailure(error.message));
  }
}

function* getProfile(action) {
  try {
    console.log("RUNNING HERE")
    const { accessToken } = action.payload;
    const response = yield call(getProfileApi, accessToken);
    const { data: responseData } = response;
    console.log(responseData)
    yield put(getProfileSuccess(responseData));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

function* updateUserAsync(action) {
  try {
    const { userData, accessToken } = action.payload;
    // Make the API call to update the user information
    const response = yield call(apiUpdateUser, userData, accessToken);
    console.log(response)
    // Handle success
    yield put(updateUserSuccess(response));
    
  } catch (error) {
    // Handle errors in the API call
    yield put(updateUserFailure('UpdateProfile failed'));
  }
}

function loginApi(email, password) {
  return axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/login', {
    email,
    password,
  });
}


const apiUpdateUser = async (userData, accessToken) => {
  try {
    const response = await axios.put(apiUrl, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.status === 'OK') {
      return response.data.data;
    } else {
      throw new Error('UpdateProfile failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function getProfileApi(accessToken) {

  return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function registerAPI (username, email, password){
  return axios.post("https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/register", {
    username,
    email,
    password
  });
};


function getUserApi(accessToken) {

  return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/user', {
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
  yield takeLatest(REGISTER_REQUEST,  registerUser);
  yield takeLatest(FETCH_USERNAMES ,  getUser);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserAsync);

  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(UPLOAD_AVATAR_REQUEST, uploadAvatar);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);

  yield all([
    eventSaga(),
    jobSaga(), 
  ]);

}