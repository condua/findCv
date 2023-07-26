// src/actions/eventActions.js
export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const getEventsRequest = () => ({
  type: GET_EVENTS_REQUEST,
});

export const getEventsSuccess = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFailure = (error) => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});
