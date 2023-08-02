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

export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const createJobRequest = (jobData) => {
  return {
    type: CREATE_JOB_REQUEST,
    payload: jobData,
  };
};

export const createJobSuccess = (job) => {
  return {
    type: CREATE_JOB_SUCCESS,
    payload: job,
  };
};

export const createJobFailure = (error) => {
  return {
    type: CREATE_JOB_FAILURE,
    payload: error,
  };
};

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export const updateJobRequest = (jobId, jobData, accessToken) => ({
  type: UPDATE_JOB_REQUEST,
  payload: {
    jobId,
    jobData,
  },
});

export const updateJobSuccess = () => ({
  type: UPDATE_JOB_SUCCESS,
});

export const updateJobFailure = (error) => ({
  type: UPDATE_JOB_FAILURE,
  payload: error,
});

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const deleteJobRequest = (jobId) => ({
  type: DELETE_JOB_REQUEST,
  payload: jobId,
});

export const deleteJobSuccess = () => ({
  type: DELETE_JOB_SUCCESS,
});

export const deleteJobFailure = (error) => ({
  type: DELETE_JOB_FAILURE,
  payload: error,
});