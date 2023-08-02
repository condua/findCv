// reducer.js
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_INITIAL,
  } from "../action/registerActions";
  
  const initialState = {
    message: null,
    data: null,
    access_token:null,
    refresh_token: null,
  };
  
  const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          data: action.payload.data,
          access_token: action.payload.access_token,
          refresh_token: action.payload.access_token,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          message: action.payload.message,
          data: action.payload.data,
          access_token: action.payload.access_token,
          refresh_token: action.payload.access_token,
        };
      default:
        return state;
    }
  };
  
  export default registerReducer;
  