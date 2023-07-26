// src/reducers/eventReducer.js
import {
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILURE,
  } from '../action/eventActions';
  
  const initialState = {
    loading: false,
    events: [],
    error: null,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EVENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_EVENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          events: action.payload,
        };
      case GET_EVENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  