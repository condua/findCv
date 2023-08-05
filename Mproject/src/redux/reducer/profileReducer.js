// reducers/profileReducer.js
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../action/profileActions';

const initialState = {
  profileData: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileData: action.payload.profileData,
        error: null,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        profileData: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default profileReducer;
