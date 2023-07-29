// src/redux/sagas/jobSaga.js
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_JOBS_REQUEST,
  getJobsSuccess,
  getJobsFailure,
} from '../action/jobActions';

function* getJobs() {
  try {
    const response = yield call(fetchJobsApi);
    const { data: responseData } = response;
    console.log(responseData)
    yield put(getJobsSuccess(responseData.data));
  } catch (error) {
    yield put(getJobsFailure(error));
  }
}


function fetchJobsApi() {
  return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/job-posting'); 
}

export default function* jobSaga() {
  yield takeLatest(GET_JOBS_REQUEST, getJobs);
}
