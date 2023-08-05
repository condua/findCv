import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../action/authActions';

const initialState = {
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
        data:action.payload.data,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        data: null,
        accessToken: null,
        refreshToken: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        data: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
