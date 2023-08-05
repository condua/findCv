// reducers.js

import {
    APPLY_JOB_REQUEST,
    APPLY_JOB_SUCCESS,
    APPLY_JOB_FAILURE,
  } from '../action/applyJobActions';
  
  const initialState = {
    loading: false,
    error: null,
  };
  
  const applyJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case APPLY_JOB_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case APPLY_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case APPLY_JOB_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default applyJobReducer;
  