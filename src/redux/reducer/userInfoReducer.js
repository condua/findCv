import { UPDATE_USER,UPDATE_USER_FIELDS,LOGIN_SUCCESS,LOGOUT } from "../action/authActions";
import { UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from '../action/userAction';

const initialState = {
    message: null,
    data: null,
    accessToken: null,
    // refreshToken: null,
    // error: null,
  };
  
  const userInfo = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          message: action.payload.message,
          data: action.payload.data.userInfo,
          accessToken: action.payload.accessToken,
        //   refreshToken: action.payload.refreshToken,
        //   error: null,
        };
    case LOGOUT:
            return {
              ...state,
            //   message: null,
              data: null,
              accessToken: null,
            //   refreshToken: null,
            //   error: null,
            };
    //   case UPDATE_USER:
    //     return {
    //       ...state,
    //       data: action.payload.data,
    //       accessToken: action.payload.accessToken,
    //     };
    //   case UPDATE_USER_FIELDS:
    //     return {
    //       ...state,
    //       data: action.payload.data,
    //       accessToken: action.payload.accessToken,
    //     };
    //   default:
    //     return state;
        case UPDATE_USER_SUCCESS:
        return {
            ...state,
            data: action.payload,
            error: null,
            message: 200,
        };
        case UPDATE_USER_FAILURE:
        return {
            ...state,
            error: action.payload,
            message: null,
        };
        default:
        return state;
    }
  };
  
  export default userInfo;