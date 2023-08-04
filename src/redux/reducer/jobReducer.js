// src/redux/reducers/jobReducer.js
import {
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  GET_JOBDETAIL_REQUEST,
  GET_JOBDETAIL_SUCCESS,
  GET_JOBDETAIL_FAILURE,
} from "../action/jobActions"

const initialState = {
  loading: false,
  jobs: [],
  error: null,
  jobDetail: null,
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_JOBS_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          }
      case GET_JOBS_SUCCESS:
          return {
              ...state,
              loading: false,
              jobs: action.payload,
          }
      case GET_JOBS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          }
      case CREATE_JOB_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          }
      case CREATE_JOB_SUCCESS:
          return {
              ...state,
              loading: false,
              jobs: [...state.jobs, action.payload],
              error: null,
          }
      case CREATE_JOB_FAILURE:
          return {
              ...state,
              loading: false,
              job: null,
              error: action.payload,
          }
      case UPDATE_JOB_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          }
      case UPDATE_JOB_SUCCESS:
          return {
              ...state,
              loading: false,
          }
      case UPDATE_JOB_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          }
      case DELETE_JOB_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          }
      case DELETE_JOB_SUCCESS:
          return {
              ...state,
              loading: false,
          }
      case DELETE_JOB_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          }
      case GET_JOBDETAIL_REQUEST:
          return { ...state, loading: true, error: null }
      case GET_JOBDETAIL_SUCCESS:
          return {
              ...state,
              loading: false,
              jobDetail: action.payload,
              error: null,
          }
      case GET_JOBDETAIL_FAILURE:
          return { ...state, loading: false, error: action.payload }

      default:
          return state
  }
}

export default jobReducer