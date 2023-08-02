// actions.js
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


export const registerRequest = (username, email,password) => ({
  type: REGISTER_REQUEST,
  payload: {username, email,password}
});

export const registerSuccess = (message,data,access_token,refresh_token) => ({
  type: REGISTER_SUCCESS,
  payload: {message,data,access_token,refresh_token}
});

export const registerFailure = (message) => ({
  type: REGISTER_FAILURE,
  payload: message,
});

