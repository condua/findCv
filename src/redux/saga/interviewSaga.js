// src/redux/sagas/eventSaga.js
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_INTERVIEW_REQUEST,
    getInterviewSuccess,
    getInterviewFailure,
} from '../action/interviewActions';


// ***** API Interview get all Infor Interview ******

// GET ALL ROOM (Không có data của Dashboard)
function getInterviewApi(accessToken) {

    return axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/interview', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

function* getInterview(action) {
    try {
        const { accessToken } = action.payload
        const response = yield call(getInterviewApi, accessToken)
        const { data: responseData } = response
        // Xử lý dữ liệu trả về 

        yield put(getInterviewSuccess(responseData)); 
    } catch (error) {
        yield put(getInterviewFailure(error));
    }
}

export default function* InterviewSaga() {
    yield takeLatest(GET_INTERVIEW_REQUEST, getInterview)
}


