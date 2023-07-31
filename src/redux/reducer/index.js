import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import rdcSidebar from './rdcSidebar.js';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';

import uploadAvatarReducer from './uploadAvatarReducer';

import jobReducer from './jobReducer.js';


const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: rdcSidebar,
  profile: profileReducer,
  events: eventReducer,

  uploadAvatar: uploadAvatarReducer,

  jobs: jobReducer,

});

export default rootReducer;

