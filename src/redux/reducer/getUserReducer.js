// reducer.js
import {
    FETCH_USERNAMES,
    FETCH_USERNAMES_SUCCESS,
    FETCH_USERNAMES_FAILURE,
  } from '../action/getUserAction';
import { LOGIN_SUCCESS } from '../action/authActions';

  const initialState = {
    usernames: 
      {
        data: {
          data: 
            [{ id: null, 
              name: null,
              email:null,
              permission:null,
              dateRegister: null,
              dateBlacklist: null,
              accountStatus: null,
              listInterview:[
                {
                  dateInterview:null,
                  position:null,
                  averageScore:null
                }
               
              ],
              avt:null,
              username:null,
              phone:null,
              address:null,
              status:null,
              skill:null,
              experience:null,
              listJobPosting:[
                {
                  name:null,
                  position:null,
                }
              ]
            },
          ],
        },
      },
  
    loading: true,
    error: null,
    accessToken: null,
  };
  
const getUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS: 
        return {...state, accessToken: action.payload.accessToken}
      case FETCH_USERNAMES:
        return { ...state, loading: true, error: null };
      case FETCH_USERNAMES_SUCCESS:
        return { ...state, usernames: action.payload, loading: false, error: null };
      case FETCH_USERNAMES_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default getUserReducer;
  