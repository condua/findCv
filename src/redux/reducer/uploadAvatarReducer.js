import { UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAILURE } from '../action/uploadAvatarActions';

const initialState = {
  avatarUrl: '',
  avatarFile: null,
  error: null,
};

const uploadAvatarReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case UPLOAD_AVATAR_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
        avatarFile: null,
        error: null,
      };
    case UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default uploadAvatarReducer;
