import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
} from '../action/eventActions';

const initialState = {
  loading: false,
  events: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case CREATE_EVENT_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case CREATE_EVENT_SUCCESS:
          return {
            ...state,
            loading: false,
            events: [...state.events, action.payload], 
          };
        case CREATE_EVENT_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case DELETE_EVENT_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
          case DELETE_EVENT_SUCCESS:
            return {
              ...state,
              loading: false,
            };
          case DELETE_EVENT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
            case UPDATE_EVENT_REQUEST:
              return {
                ...state,
                loading: true,
                error: null,
              };
            case UPDATE_EVENT_SUCCESS:
              return {
                ...state,
                loading: false,
              };
            case UPDATE_EVENT_FAILURE:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
    default:
      return state;
  }
};

export default eventReducer;
