import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import rdcSidebar from './rdcSidebar.js';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';
import registerReducer from './registerReducer.js'
import getUserReducer from './getUserReducer.js'

import jobReducer from './jobReducer.js';
import userInfo from './userInfoReducer.js';
import getProfileReducer from './getProfileReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: rdcSidebar,
  profile: profileReducer,
  events: eventReducer,
  register: registerReducer,
  getuser: getUserReducer,
  jobs: jobReducer,
  userinfo: userInfo,
  getprofile: getProfileReducer,
});

export default rootReducer;