import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,UPLOAD_REQUEST,UPLOAD_SUCCESS,UPDATE_USER,UPDATE_USER_FIELDS } from '../action/authActions';

const initialState = {
  message: null,
  data: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        data: action.payload.data,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: action.payload,
        data: null,
        accessToken: null,
        refreshToken: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        message: null,
        data: null,
        accessToken: null,
        refreshToken: null,
        error: null,
      };

    case UPLOAD_REQUEST:
      return{
        ...state,
        // accessToken: action.payload.accessToken
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    // case UPDATE_USER:
    //   return {
    //     ...state,
    //     data: action.payload.data,
    //     accessToken: action.payload.accessToken,
    //   };
    // case UPDATE_USER_FIELDS:
    //   return {
    //     ...state,
    //     data: action.payload.data,
    //     accessToken: action.payload.accessToken,
    //   };
    default:
      return state;
  }
};

export default authReducer;