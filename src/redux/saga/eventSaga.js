// src/redux/sagas/eventSaga.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_EVENTS_REQUEST,
  CREATE_EVENT_REQUEST,
  getEventsSuccess,
  getEventsFailure,
  createEventSuccess,
  createEventFailure,
} from '../action/eventActions';

function* getEvents() {
    try {
      // Gọi API để lấy dữ liệu sự kiện
      const response = yield call(fetchEventsApi);
      const { data: responseData } = response;
      console.log(responseData)
      // Lưu dữ liệu sự kiện vào Redux store
      yield put(getEventsSuccess(responseData.data));
    } catch (error) {
      yield put(getEventsFailure(error));
    }
  }
  
  function fetchEventsApi() {
    return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/event');
  }


  function* createEvent(action) {
    try {
    const accessToken = yield select((state) => state.auth.accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
      const response = yield call(postEventsApi, action.payload, headers);
      const { data: responseData } = response;
      console.log(responseData);
      if (responseData.success) {
        yield put(createEventSuccess(responseData.data));
      } else {
        yield put(createEventFailure(responseData.error));
      }
    } catch (error) {
      yield put(createEventFailure(error));
    }
  }
  
  function postEventsApi(eventData, headers) {
    return axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/event', eventData, {
      headers
    });
  }


export default function* eventSaga() {
  yield takeLatest(GET_EVENTS_REQUEST, getEvents);
  yield takeLatest(CREATE_EVENT_REQUEST, createEvent);
}
