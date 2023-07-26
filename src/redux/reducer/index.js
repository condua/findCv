import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; 
import rdcSidebar from './rdcSidebar.js';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: rdcSidebar,
  profile: profileReducer,
  events: eventReducer,
});

export default rootReducer;
