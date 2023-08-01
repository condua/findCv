export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'

export const UPDATE_USER  ='UPDATE_USER'
export const UPDATE_USER_FIELDS ='UPDATE_USER_FIELDS'




export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (message,data, accessToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: { message, data, accessToken, refreshToken },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const uploadRequest = (accesToken) =>({
  type: UPLOAD_REQUEST,
  payload: accesToken
})

export const uploadSuccess = (data,accessToken) => ({
  type: UPLOAD_SUCCESS,
  payload: {data,accessToken}
});



export const refreshTokenRequest = (accessToken, refreshToken) => ({
  type: REFRESH_TOKEN_REQUEST,
  payload: { accessToken, refreshToken },
});

export const refreshSuccess = (newAccessToken) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: newAccessToken,
});

export const updateUser = (data,accessToken) => ({
  type: 'UPDATE_USER',
  payload: {data,accessToken}
});

export const updateUserFields = (data,accessToken) => ({
  type: 'UPDATE_USER_FIELDS',
  payload: {data,accessToken}
});
