import { combineReducers, createStore } from "redux";
import rdcSidebar from './reducer/rdcSidebar';


const globalState = combineReducers({
    sidebar: rdcSidebar
  });


const store = createStore(globalState);

export default store;