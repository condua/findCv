export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const getEventsRequest = () => ({
  type: GET_EVENTS_REQUEST,
});

export const getEventsSuccess = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFailure = (error) => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});


export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEventRequest = (eventData) => ({
  type: CREATE_EVENT_REQUEST,
  payload: eventData,
});

export const createEventSuccess = (event) => ({
  type: CREATE_EVENT_SUCCESS,
  payload: event,
});

export const createEventFailure = (error) => ({
  type: CREATE_EVENT_FAILURE,
  payload: error,
});

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const deleteEventRequest = (eventId, accessToken) => ({
  type: DELETE_EVENT_REQUEST,
  payload: {
    eventId,
    accessToken,
  },
});


export const deleteEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS,
});

export const deleteEventFailure = (error) => ({
  type: DELETE_EVENT_FAILURE,
  payload: error,
});


export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const updateEventRequest = (eventId, eventData, accessToken) => ({
  type: UPDATE_EVENT_REQUEST,
  payload: {
    eventId,
    eventData,
    accessToken,
  },
});

export const updateEventSuccess = () => ({
  type: UPDATE_EVENT_SUCCESS,
});

export const updateEventFailure = (error) => ({
  type: UPDATE_EVENT_FAILURE,
  payload: error,
});