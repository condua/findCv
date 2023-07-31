// src/redux/actions/jobActions.js
export const GET_JOBS_REQUEST = 'GET_JOBS_REQUEST';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_FAILURE = 'GET_JOBS_FAILURE';

export const getJobsRequest = () => ({
  type: GET_JOBS_REQUEST,
});

export const getJobsSuccess = (jobs) => ({
  type: GET_JOBS_SUCCESS,
  payload: jobs,
});

export const getJobsFailure = (error) => ({
  type: GET_JOBS_FAILURE,
  payload: error,
});
