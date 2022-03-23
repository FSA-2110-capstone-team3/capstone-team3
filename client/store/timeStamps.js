import axios from 'axios'

//------------ACTION TYPES------------//

const GET_TIMESTAMPS = 'GET_TIMESTAMPS';
const ADD_TIMESTAMP = 'ADD_TIMESTAMP';
const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP';
const DELETE_TIMESTAMP = 'DELETE_TIMESTAMP';

//------------ACTION CREATORS------------//

const _getTimeStamps = (timeStamps) => {
  return {
    type: GET_TIMESTAMPS,
    timeStamps
  }
};

const _addTimeStamp = (timeStamp) => {
  return {
    type: ADD_TIMESTAMP,
    timeStamp
  }
};

const _updateTimeStamp = (timeStamp) => {
  return {
    type: UPDATE_TIMESTAMP,
    timeStamp
  }
};

const _deleteTimeStamp = (id) => {
  return {
    type: DELETE_TIMESTAMP,
    id
  }
};

//------------THUNKS------------//

export const getTimeStamps = () => {
  return async(dispatch) => {
    const timeStamps = (await axios.get('/api/timeStamps')).data;
    dispatch(_getTimeStamps(timeStamps));
  }
};

export const addTimeStamp = (timeStamp) => {
  return async(dispatch) => {
    const newTimeStamp = (await axios.post('/api/timeStamps', timeStamp)).data;
    dispatch(_addTimeStamp(newTimeStamp));
  }
};

export const updateTimeStamp = (timeStamp) => {
  return async(dispatch) => {
    timeStamp = (await axios.put(`/api/timeStamps/${timeStamp.id}`, timeStamp)).data;
    dispatch(_updateTimeStamp(timeStamp));
  }
};

export const deleteTimeStamp = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/timeStamps/${id}`);
    dispatch(_deleteTimeStamp(id));
  }
}

//------------REDUCER------------//

export const timeStamps = (state = [], action) => {
  switch (action.type) {
    case GET_TIMESTAMPS:
      return action.timeStamps
    case ADD_TIMESTAMP:
      return [...state, action.timeStamp]
    case UPDATE_TIMESTAMP:
      return state.map((timeStamp) => timeStamp.id === action.timeStamp.id ? action.timeStamp : timeStamp)
    case DELETE_TIMESTAMP:
      return state.filter((timeStamp) => timeStamp !== action.id)
    default:
      return state
  }
}