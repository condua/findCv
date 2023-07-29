// src/redux/sagas/eventSaga.js
import { takeLatest, call, put, select } from "redux-saga/effects"
import axios from "axios"
import {
    GET_EVENTS_REQUEST,
    CREATE_EVENT_REQUEST,
    getEventsSuccess,
    getEventsFailure,
    createEventSuccess,
    createEventFailure,
    DELETE_EVENT_REQUEST,
    deleteEventSuccess,
    deleteEventFailure,
    UPDATE_EVENT_REQUEST,
    updateEventSuccess,
    updateEventFailure,
} from "../action/eventActions"

function* getEvents() {
    try {
        const response = yield call(fetchEventsApi)
        const { data: responseData } = response
        console.log(responseData)
        yield put(getEventsSuccess(responseData.data))
    } catch (error) {
        yield put(getEventsFailure(error))
    }
}

function fetchEventsApi() {
    return axios.get("https://qltd01.cfapps.us10-001.hana.ondemand.com/event")
}

function* createEvent(action) {
    try {
        const accessToken = yield select((state) => state.auth.accessToken)
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        const response = yield call(postEventsApi, action.payload, headers)
        const { data: responseData } = response
        console.log(responseData)
        if (responseData.success) {
            yield put(createEventSuccess(responseData.data))
        } else {
            yield put(createEventFailure(responseData.error))
        }
    } catch (error) {
        yield put(createEventFailure(error))
    }
}

function postEventsApi(eventData, headers) {
    return axios.post(
        "https://qltd01.cfapps.us10-001.hana.ondemand.com/event",
        eventData,
        {
            headers,
        }
    )
}

function* deleteEvent(action) {
    try {
        const { eventId, accessToken } = action.payload

        yield call(deleteEventApi, eventId, accessToken)
        console.log("Delete event API call successful")
        yield put(deleteEventSuccess())
    } catch (error) {
        yield put(deleteEventFailure(error))
    }
}

function deleteEventApi(eventId, accessToken) {
    return axios.delete(
        `https://qltd01.cfapps.us10-001.hana.ondemand.com/event/${eventId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
}

function* updateEvent(action) {
    try {
        const { eventId, eventData, accessToken } = action.payload
        yield call(updateEventApi, eventId, eventData, accessToken)
        yield put(updateEventSuccess())
    } catch (error) {
        yield put(updateEventFailure(error))
    }
}

function updateEventApi(eventId, eventData, accessToken) {
    return axios.put(
        `https://qltd01.cfapps.us10-001.hana.ondemand.com/event/${eventId}`,
        eventData,
        {

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
}

export default function* eventSaga() {
    yield takeLatest(GET_EVENTS_REQUEST, getEvents)
    yield takeLatest(CREATE_EVENT_REQUEST, createEvent)
    yield takeLatest(DELETE_EVENT_REQUEST, deleteEvent)
    yield takeLatest(UPDATE_EVENT_REQUEST, updateEvent)
}
