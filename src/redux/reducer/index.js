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
import questionReducer from './questionReducer.js';
import interviewReducer from './interviewReducer.js';
import applyJobReducer from './applyJobReducer.js'; 

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
  question:questionReducer,
  interview:interviewReducer,
  applyJob: applyJobReducer,

});

export default rootReducer;