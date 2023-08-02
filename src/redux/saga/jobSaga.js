// src/redux/sagas/jobSaga.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_JOBS_REQUEST,
  getJobsSuccess,
  getJobsFailure,
  createJobSuccess,
  CREATE_JOB_REQUEST,
  createJobFailure,
  UPDATE_JOB_REQUEST,
  updateJobSuccess,
  updateJobFailure,
  deleteJobSuccess,
  deleteJobFailure,
  DELETE_JOB_REQUEST,
  
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

function* createJob(action) {
  try {
      const accessToken = yield select((state) => state.auth.accessToken)
      const headers = {
          Authorization: `Bearer ${accessToken}`,
      }
      const response = yield call(postJobsApi, action.payload, headers)
      const { data: responseData } = response
      console.log(responseData)
      if (responseData.success) {
          yield put(createJobSuccess(responseData.data))
      } else {
          yield put(createJobFailure(responseData.error))
      }
  } catch (error) {
      yield put(createJobFailure(error))
  }
}
function postJobsApi(jobData, headers) {
  return axios.post(
      "https://qltd01.cfapps.us10-001.hana.ondemand.com/job-posting",
      jobData,
      {
          headers,
      }
  )
}

function* updateJob(action) {
  try {
    const accessToken = yield select((state) => state.auth.accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const  jobId  = action.payload.jobId;
    const jobData = action.payload.jobData
    yield call(updateJobApi, jobId, jobData, headers);
    yield put(updateJobSuccess());
  } catch (error) {
    yield put(updateJobFailure(error));
  }
}

function updateJobApi(jobId, jobData, headers) {
  return axios.put(
    `https://qltd01.cfapps.us10-001.hana.ondemand.com/job-posting/${jobId}`,
    jobData,
    { headers }
  );
}

function* deleteJob(action) {
  try {
      const  jobId = action.payload
      const accessToken = yield select((state) => state.auth.accessToken);
      yield call(deleteJobApi, jobId, accessToken)
      console.log(jobId)
      yield put(deleteJobSuccess())
  } catch (error) {
      yield put(deleteJobFailure(error))
  }
}

function deleteJobApi(jobId, accessToken) {
  return axios.delete(
      `https://qltd01.cfapps.us10-001.hana.ondemand.com/job-posting/${jobId}`,
      {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      }
  )
}




export default function* jobSaga() {
  yield takeLatest(GET_JOBS_REQUEST, getJobs);
  yield takeLatest(CREATE_JOB_REQUEST, createJob);
  yield takeLatest(UPDATE_JOB_REQUEST, updateJob);
  yield takeLatest(DELETE_JOB_REQUEST, deleteJob);
}