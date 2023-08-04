import {
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILURE,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAILURE,
  GET_QUESTION_BY_ID_SUCCESS,
  GET_QUESTION_BY_ID_FAILURE
} from '../action/questionActions';

const initialState = {
  status: null,
  message: null,
  questionData: null,
  // questionDataByID: null,
  error: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {

    // GET
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload,
        questionData: action.payload.questionData,
        // questionDataByID: action.payload.questionDataByID,
        error: null,
      };
    case GET_QUESTION_FAILURE:
      return {
        ...state,
        status: null,
        message: null,
        questionData: null,
        // questionDataByID: null,
        error: action.payload.error,
      };

    // POST
    case CREATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [...state.questions, action.payload],
      };
    case CREATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case GET_QUESTION_BY_ID_SUCCESS:
    //   return {
    //     ...state,
    //     status: action.payload.status,
    //     message: action.payload.message,
    //     questionData: action.payload.questionData,
    //     questionDataByID: action.payload.questionDataByID,
    //     error: null,
    //   };
    // case GET_QUESTION_BY_ID_FAILURE:
    //   return {
    //     ...state,
    //     status: null,
    //     message: null,
    //     questionData: null,
    //     questionDataByID: null,
    //     error: action.payload.error,
    //   };
    default:
      return state;
  }
};
export default questionReducer;
