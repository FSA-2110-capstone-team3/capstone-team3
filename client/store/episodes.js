import axios from 'axios'

//------------ACTION TYPES------------//

const GET_EPISODES = 'GET_EPISODES';
const ADD_EPISODE = 'ADD_EPISODE';
const GET_SINGLE_EPISODE = 'GET_SINGLE_EPISODE';
const UPDATE_EPISODE = 'UPDATE_EPISODE';
const DELETE_EPISODE = 'DELETE_EPISODE';

//------------ACTION CREATORS------------//

const _getEpisodes = (episodes) => {
  return {
    type: GET_EPISODES,
    episodes
  }
};

const _getSingleEpisode = (episode) => {
  return {
    type: GET_SINGLE_EPISODE,
    episode
  }
};

const _addEpisode = (episode) => {
  return {
    type: ADD_EPISODE,
    episode
  }
};

const _updateEpisode = (episode) => {
  return {
    type: UPDATE_EPISODE,
    episode
  }
};

const _deleteEpisode = (id) => {
  return {
    type: DELETE_EPISODE,
    id
  }
};

//------------THUNKS------------//

export const getEpisodes = () => {
  return async(dispatch) => {
    const episodes = (await axios.get('/api/episodes')).data;
    dispatch(_getEpisodes(episodes));
  }
};

export const getSingleEpisode = (info) => {
  return async(dispatch) => {
    const episode = (await axios.post(`/api/episodes/${info.id}`, {access_token: info.access_token, userId: info.userId})).data;
    dispatch(_getSingleEpisode(episode));
  }
};

export const addEpisode = (episode) => {
  return async(dispatch) => {
    const newepisode = (await axios.post('/api/episodes', episode)).data;
    dispatch(_addEpisode(newepisode));
  }
};

export const updateEpisode = (episode) => {
  return async(dispatch) => {
    episode = (await axios.put(`/api/episodes/${episode.id}`, episode)).data;
    dispatch(_updateEpisode(episode));
  }
};

export const deleteEpisode = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/episodes/${id}`);
    dispatch(_deleteEpisode(id));
  }
}

//------------REDUCER------------//

export const episodes = (state = [], action) => {
  switch (action.type) {
    case GET_EPISODES:
      return action.episodes
    case GET_SINGLE_EPISODE:
      return action.episode
    case ADD_EPISODE:
      return [...state, action.episode]
    case UPDATE_EPISODE:
      return state.map((episode) => episode.id === action.episode.id ? action.episode : episode)
    case DELETE_EPISODE:
      return state.filter((episode) => episode.id !== action.id)
    default:
      return state
  }
}