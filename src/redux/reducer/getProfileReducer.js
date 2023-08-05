// reducer.js
import { GETPROFILE_REQUEST,GETPROFILE_SUCCESS,GETPROFILE_FAILURE } from '../action/getProfileAction';
import { LOGIN_SUCCESS } from '../action/authActions';

  const initialState = {
    usernames: [],
    loading: false,
    error: null,
    accessToken:null,
  };
  
const getProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS: 
        return {...state, accessToken: action.payload.accessToken}
      case GETPROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case GETPROFILE_SUCCESS:
        return { ...state, usernames: action.payload.data, loading: false, error: null };
      case GETPROFILE_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default getProfileReducer;
  