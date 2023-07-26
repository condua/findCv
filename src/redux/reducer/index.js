import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import rdcSidebar from './rdcSidebar.js';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';
import jobReducer from './jobReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: rdcSidebar,
  profile: profileReducer,
  events: eventReducer,
  jobs: jobReducer,
});

export default rootReducer;
