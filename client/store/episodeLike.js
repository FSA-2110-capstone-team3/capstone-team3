import axios from 'axios'

//------------ACTION TYPES------------//

const GET_EPISODE_LIKES = 'GET_EPISODE_LIKES';
const ADD_EPISODE_LIKE = 'ADD_EPISODE_LIKE';
const UPDATE_EPISODE_LIKE = 'UPDATE_EPISODE_LIKE';
const DELETE_EPISODE_LIKE = 'DELETE_EPISODE_LIKE';

//------------ACTION CREATORS------------//

const _getEpisodeLikes = (episodeLikes) => {
  return {
    type: GET_EPISODE_LIKES,
    episodeLikes
  }
};

const _addEpisodeLike = (episodeLike) => {
  return {
    type: ADD_EPISODE_LIKE,
    episodeLike
  }
};

const _updateEpisodeLike = (episodeLike) => {
  return {
    type: UPDATE_EPISODE_LIKE,
    episodeLike
  }
};

const _deleteEpisodeLike = (id) => {
  return {
    type: DELETE_EPISODE_LIKE,
    id
  }
};

//------------THUNKS------------//

export const getEpisodeLikes = () => {
  return async(dispatch) => {
    const episodeLikes = (await axios.get('/api/episodeLikes')).data;
    dispatch(_getEpisodeLikes(episodeLikes));
  }
};

export const addEpisodeLike = (userId, episodeId, status) => {
  return async(dispatch) => {
    const startPayload = {userId: userId, episodeId: episodeId}
    const finalPayload = Object.assign(startPayload, status)

    const newEpisodeLike = (await axios.post('/api/episodeLikes', finalPayload )).data;
    dispatch(_addEpisodeLike(newEpisodeLike));
  }
};

export const updateEpisodeLike = (id, status) => {
  return async(dispatch) => {
    const episodeLike = (await axios.put(`/api/episodeLikes/${id}`, status)).data;
    dispatch(_updateEpisodeLike(episodeLike));
  }
};

export const deleteEpisodeLike = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/episodeLikes/${id}`);
    dispatch(_deleteEpisodeLike(id));
  }
}

//------------REDUCER------------//

export const episodeLikes = (state = [], action) => {
  switch (action.type) {
    case GET_EPISODE_LIKES:
      return action.episodeLikes
    case ADD_EPISODE_LIKE:
      return [...state, action.episodeLike]
    case UPDATE_EPISODE_LIKE:
      return state.map((episodeLike) => episodeLike.id === action.episodeLike.id ? action.episodeLike : episodeLike)
    case DELETE_EPISODE_LIKE:
      return state.filter((episodeLike) => episodeLike.id !== action.id)
    default:
      return state
  }
}