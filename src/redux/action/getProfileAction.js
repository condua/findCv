export const GETPROFILE_REQUEST = 'GETPROFILE_REQUEST';
export const GETPROFILE_SUCCESS = 'GETPROFILE_SUCCESS';
export const GETPROFILE_FAILURE = 'GETPROFILE_FAILURE';

export const getProfileRequest = (accessToken) => ({
    type: GETPROFILE_REQUEST,
    payload: {accessToken},
  });

  export const getProfileSuccess = (data) => ({
    type: GETPROFILE_SUCCESS,
    payload: {data},
  });

  export const getProfileFailure = (error) => ({
    type: GETPROFILE_FAILURE,
    payload: {error},
  });