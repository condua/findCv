// uploadFILEActions.js
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const uploadFILERequest = (accessToken, File) => ({
  type: UPLOAD_FILE_REQUEST,
  payload: { accessToken, File },
});

export const uploadFILESuccess = (FileUrl) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: { FILEUrl },
});

export const uploadFILEFailure = (error) => ({
  type: UPLOAD_FILE_FAILURE,
  payload: { error },
});
