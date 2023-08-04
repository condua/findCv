export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';

export const getQuestionRequest = (accessToken) => ({
  type: GET_QUESTION_REQUEST,
  payload: { accessToken },
});

export const getQuestionSuccess = (questionData) => ({
  type: GET_QUESTION_SUCCESS,
  payload: { questionData },
});

export const getQuestionFailure = (error) => ({
  type: GET_QUESTION_FAILURE,
  payload: { error },
});


export const CREATE_QUESTION_REQUEST = 'CREATE_QUESTION_REQUEST';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';

export const createQuestionRequest = (questionData) => ({
  type: CREATE_QUESTION_REQUEST,
  payload: questionData,
});

export const createQuestionSuccess = (question) => ({
  type: CREATE_QUESTION_SUCCESS,
  payload: question,
});

export const createQuestionFailure = (error) => ({
  type: CREATE_QUESTION_FAILURE,
  payload: error,
});


export const DELETE_QUESTION_REQUEST = 'DELETE_QUESTION_REQUEST';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';

export const deleteQuestionRequest = (questionId, accessToken) => ({
  type: DELETE_QUESTION_REQUEST,
  payload: {
    questionId,
    accessToken,
  },
});
export const deleteQuestionSuccess = () => ({
  type: DELETE_QUESTION_SUCCESS,
});

export const deleteQuestionFailure = (error) => ({
  type: DELETE_QUESTION_FAILURE,
  payload: error,
});


export const UPDATE_QUESTION_REQUEST = 'UPDATE_QUESTION_REQUEST';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';

export const updateQuestionRequest = (questionId, questionData) => ({
  type: UPDATE_QUESTION_REQUEST,
  payload: {
    questionId,
    questionData,
  },
});

export const updateQuestionSuccess = () => ({
  type: UPDATE_QUESTION_SUCCESS,
});

export const updateQuestionFailure = (error) => ({
  type: UPDATE_QUESTION_FAILURE,
  payload: error,
});

// export const GET_QUESTION_BY_ID_REQUEST = 'GET_QUESTION_BY_ID_REQUEST';
// export const GET_QUESTION_BY_ID_SUCCESS = 'GET_QUESTION_BY_ID_SUCCESS';
// export const GET_QUESTION_BY_ID_FAILURE = 'GET_QUESTION_BY_ID_FAILURE';

// export const getQuestionByIDRequest = (accessToken, questionId) => {
//   // console.log("AAA", accessToken);
//   // console.log("AAA", questionId);
//   return {
//     type: GET_QUESTION_BY_ID_REQUEST,
//     payload: { accessToken, questionId }
//   };
// };


// export const getQuestionByIDSuccess = (questionDataByID) => ({
//   type: GET_QUESTION_BY_ID_SUCCESS,
//   payload: { questionDataByID },
// });

// export const getQuestionByIDFailure = (error) => ({
//   type: GET_QUESTION_BY_ID_FAILURE,
//   payload: { error },
// });