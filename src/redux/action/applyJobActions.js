// actions.js

export const APPLY_JOB_REQUEST = 'APPLY_JOB_REQUEST';
export const APPLY_JOB_SUCCESS = 'APPLY_JOB_SUCCESS';
export const APPLY_JOB_FAILURE = 'APPLY_JOB_FAILURE';

export const applyJobRequest = (accessToken, jobId) => ({
  type: APPLY_JOB_REQUEST,
  payload: { accessToken, jobId },
});

export const applyJobSuccess = () => ({
  type: APPLY_JOB_SUCCESS,
});

export const applyJobFailure = (error) => ({
  type: APPLY_JOB_FAILURE,
  payload: { error },
});