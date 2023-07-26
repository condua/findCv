// src/redux/sagas/eventSaga.js
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_EVENTS_REQUEST,
  getEventsSuccess,
  getEventsFailure,
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

// The root saga for events
export default function* eventSaga() {
  yield takeLatest(GET_EVENTS_REQUEST, getEvents);
}
