// actions/profileActions.js
export const GET_INTERVIEW_REQUEST = 'GET_INTERVIEW_REQUEST';
export const GET_INTERVIEW_SUCCESS = 'GET_INTERVIEW_SUCCESS';
export const GET_INTERVIEW_FAILURE = 'GET_INTERVIEW_FAILURE';

export const getInterviewRequest = (accessToken) => ({
    type: GET_INTERVIEW_REQUEST,
    payload: { accessToken },
});

export const getInterviewSuccess = (interviewData) => ({
    type: GET_INTERVIEW_SUCCESS,
    payload: { interviewData },
});

export const getInterviewFailure = (error) => ({
    type: GET_INTERVIEW_FAILURE,
    payload: { error },
});
