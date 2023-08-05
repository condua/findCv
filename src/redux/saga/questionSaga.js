// src/redux/sagas/eventSaga.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_QUESTION_REQUEST,
    CREATE_QUESTION_REQUEST,
    DELETE_QUESTION_REQUEST,
    UPDATE_QUESTION_REQUEST,
    GET_QUESTION_BY_ID_REQUEST,
    getQuestionSuccess,
    getQuestionFailure,
    createQuestionSuccess,
    createQuestionFailure,
    deleteQuestionSuccess,
    deleteQuestionFailure,
    updateQuestionSuccess,
    updateQuestionFailure,
    getQuestionByIDSuccess,
    getQuestionByIDFailure
} from '../action/questionActions';


// ***** API Question ******

// GET
function getQuestionApi(accessToken) {

    return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/question', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

function* getQuestion(action) {
    try {
        const { accessToken } = action.payload
        // console.log("sagas",accessToken)
        const response = yield call(getQuestionApi, accessToken)


        const { data: responseData } = response
        // Xử lý dữ liệu trả về 
        // console.log("check true", responseData)

        yield put(getQuestionSuccess(responseData));
    } catch (error) {
        yield put(getQuestionFailure(error));
    }
}

// GET BY ID
// function getQuestionByIDApi(accessToken, questionId) {
//     // console.log("AAA", accessToken)
//     // console.log("AAA", questionId)
//     return axios.get(`https://qltd01.cfapps.us10-001.hana.ondemand.com/question/${questionId}`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
// }

// function* getQuestionByID(action) {
//     try {
//         const { accessToken, questionId } = action.payload
//         // console.log("AAA", accessToken)
//         // console.log("AAA", questionId)
//         const response = yield call(getQuestionByIDApi, accessToken, questionId)
//         const { data: responseData } = response
//         // console.log("response", responseData)
//         // Xử lý dữ liệu trả về 
//         // console.log("check true", responseData)

//         yield put(getQuestionByIDSuccess(responseData));
//     } catch (error) {
//         yield put(getQuestionByIDFailure(error));
//     }
// }


// POST
function* createQuestion(action) {
    try {
        const accessToken = yield select((state) => state.auth.accessToken);
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = yield call(createQuestionApi, action.payload, headers);
        const { data: responseData } = response;
        // console.log(responseData);
        if (responseData.success) {
            yield put(createQuestionSuccess(responseData.data));
        } else {
            yield put(createQuestionFailure(responseData.error));
        }
    } catch (error) {
        yield put(createQuestionFailure(error));
    }
}

function createQuestionApi(questionData, headers) {
    console.log("questionData", questionData)
    return axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/question', questionData, {
        headers
    });
}


// DELETE
function* deleteQuestion(action) {
    try {
        const { questionId, accessToken } = action.payload
        yield call(deleteQuestionApi, questionId, accessToken)
        console.log("Delete question API call successfully")
        yield put(deleteQuestionSuccess())
    } catch (error) {
        yield put(deleteQuestionFailure(error))
    }
}

function deleteQuestionApi(questionId, accessToken) {
    console.log("accessToken Saga", accessToken)
    return axios.delete('https://qltd01.cfapps.us10-001.hana.ondemand.com/question', questionId,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
}


// PUT
function* updateQuestion(action) {
    try {
        const accessToken = yield select((state) => state.auth.accessToken)
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        const questionId = action.payload.questionId
        const questionData = action.payload.questionData
        // console.log(questionData)
        yield call(updateQuestionApi, questionId, questionData, headers)

        yield put(updateQuestionSuccess())
    } catch (error) {
        yield put(updateQuestionFailure(error))
    }
}

function updateQuestionApi(questionId, questionData, headers) {
    return axios.put('https://qltd01.cfapps.us10-001.hana.ondemand.com/question', questionData, {
        params: {
            id: questionId,
        },
        headers
    })
}

export default function* questionSaga() {
    yield takeLatest(GET_QUESTION_REQUEST, getQuestion)
    yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion)
    yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion)
    yield takeLatest(UPDATE_QUESTION_REQUEST, updateQuestion)
    // yield takeLatest(GET_QUESTION_BY_ID_REQUEST, getQuestionByID)


}






