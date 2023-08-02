// actions/profileActions.js
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const getProfileRequest = (accessToken) => ({
  type: GET_PROFILE_REQUEST,
  payload: { accessToken },
});

export const getProfileSuccess = (profileData) => ({
  type: GET_PROFILE_SUCCESS,
  payload: { profileData },
});

export const getProfileFailure = (error) => ({
  type: GET_PROFILE_FAILURE,
  payload: { error },
});

export const updateProfileRequest = (accessToken, updatedData) => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { accessToken, updatedData },
});

export const updateProfileSuccess = (profileData) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { profileData },
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: { error },
});