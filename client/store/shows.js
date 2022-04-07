import axios from 'axios'
//import queryString from "query-string";

//------------ACTION TYPES------------//

const GET_SHOWS = 'GET_SHOWS';
const ADD_SHOW = 'ADD_SHOW';
const UPDATE_SHOW = 'UPDATE_SHOW';
const DELETE_SHOW = 'DELETE_SHOW';

//------------ACTION CREATORS------------//

const _getShows = (shows) => {
  return {
    type: GET_SHOWS,
    shows
  }
};

const _addShow = (show) => {
  return {
    type: ADD_SHOW,
    show
  }
};

const _updateShow = (show) => {
  return {
    type: UPDATE_SHOW,
    show
  }
};

const _deleteShow = (id) => {
  return {
    type: DELETE_SHOW,
    id
  }
};

//------------THUNKS------------//

export const getShows = () => {
  return async(dispatch) => {
    const shows = (await axios.get('/api/shows/')).data
    dispatch(_getShows(shows));
  }
};

export const addShow = (show) => {
  return async(dispatch) => {
    const newShow = (await axios.post('/api/shows', show)).data;
    dispatch(_addShow(newShow));
  }
};

export const updateShow = (show) => {
  return async(dispatch) => {
    show = (await axios.put(`/api/shows/${show.id}`, show)).data;
    dispatch(_updateShow(show));
  }
};

export const deleteShow = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/shows/${id}`);
    dispatch(_deleteShow(id));
  }
};

//------------REDUCER------------//

export const shows = (state = [], action) => {
  switch (action.type) {
    case GET_SHOWS:
      return action.shows;
    case ADD_SHOW:
      return [...state, action.show];
    case UPDATE_SHOW:
      return state.map((show) => show.id === action.show.id ? action.show : show);
    case DELETE_SHOW:
      return state.filter((show) => show.id !== action.id);
    default:
      return state;
  }
};
