// actionTypes.js
export const FETCH_USERNAMES = 'FETCH_USERNAMES';
export const FETCH_USERNAMES_SUCCESS = 'FETCH_USERNAMES_SUCCESS';
export const FETCH_USERNAMES_FAILURE = 'FETCH_USERNAMES_FAILURE';

// actions.js
export const fetchUsernames = (accessToken) => ({
  type: FETCH_USERNAMES,
  payload: {accessToken },
});

export const fetchUsernamesSuccess = (usernames) => ({
  type: FETCH_USERNAMES_SUCCESS,
  payload: usernames,
});

export const fetchUsernamesFailure = (error) => ({
  type: FETCH_USERNAMES_FAILURE,
  payload: error,
});