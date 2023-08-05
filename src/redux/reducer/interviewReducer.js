// reducers/profileReducer.js
import { GET_INTERVIEW_SUCCESS, GET_INTERVIEW_FAILURE } from '../action/interviewActions';

const initialState = {
    status: null,
    message: null,
    interviewData: null,
    error: null,
};

const interviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INTERVIEW_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload,
                interviewData: action.payload.interviewData,
                error: null,
            };
        case GET_INTERVIEW_FAILURE:
            return {
                ...state,
                status: null,
                message: null,
                interviewData: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default interviewReducer;
