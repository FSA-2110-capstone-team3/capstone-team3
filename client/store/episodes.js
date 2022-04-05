import axios from 'axios'

//------------ACTION TYPES------------//

const GET_EPISODES = 'GET_EPISODES';
// const ADD_EPISODE = 'ADD_EPISODE'; //Deprecated, see singleEpisode
const UPDATE_EPISODE = 'UPDATE_EPISODE';
const DELETE_EPISODE = 'DELETE_EPISODE';

//------------ACTION CREATORS------------//

const _getEpisodes = (episodes) => {
  return {
    type: GET_EPISODES,
    episodes
  }
};

//<---Deprecated, no longer using addEpisode (see singleEpisode)--->
// const _addEpisode = (episode) => {
//   return {
//     type: ADD_EPISODE,
//     episode
//   }
// };

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

//<---Deprecated--->> no longer used as singleEpisode adds an episode if not in db
//POST(add a single episode via showId) // admin only if used
// export const addEpisode = (showId, episode) => {
//   const id = showId;
//   return (dispatch) => {
//     const newEpisode = (await axios.post('/api/episodes', {id, episode})).data;
//     dispatch(_addEpisode(newEpisode));
//   }
//   res.send(newEpisode)
// };

export const updateEpisode = (spotify_id, payload) => {
  return async(dispatch) => {
    const episode = (await axios.put(`/api/episodes/${spotify_id}`, payload)).data;
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
    // case ADD_EPISODE: //Deprecated, see singleEpisode
    //   return [...state, action.episode]
    case UPDATE_EPISODE:
      return state.map((episode) => episode.id === action.episode.id ? action.episode : episode)
    case DELETE_EPISODE:
      return state.filter((episode) => episode.id !== action.id)
    default:
      return state
  }
}