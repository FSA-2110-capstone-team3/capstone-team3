import axios from "axios";

//------------ACTION TYPES------------//

const GET_EPISODES = "GET_EPISODES";
// const ADD_EPISODE = 'ADD_EPISODE'; //Deprecated, see singleEpisode
const UPDATE_EPISODE = "UPDATE_EPISODE";
const UPDATE_EPISODE_VIEWS = "UPDATE_EPISODE_VIEWS";
const DELETE_EPISODE = "DELETE_EPISODE";

//------------ACTION CREATORS------------//

const _getEpisodes = (episodes) => {
  return {
    type: GET_EPISODES,
    episodes,
  };
};

const _updateEpisode = (episode) => {
  return {
    type: UPDATE_EPISODE,
    episode,
  };
};

const _updateEpisodeViews = (episode) => {
  return {
    type: UPDATE_EPISODE_VIEWS,
    episode,
  };
};

const _deleteEpisode = (id) => {
  return {
    type: DELETE_EPISODE,
    id,
  };
};

//------------THUNKS------------//

export const getEpisodes = () => {
  return async (dispatch) => {
    const episodes = (await axios.get("/api/episodes")).data;
    dispatch(_getEpisodes(episodes));
  };
};

export const updateEpisode = (spotify_id, payload) => {
  return async (dispatch) => {
    const episode = (await axios.put(`/api/episodes/${spotify_id}`, payload))
      .data;
    dispatch(_updateEpisode(episode));
  };
};

export const updateEpisodeViews = (spotify_id) => {
  return async (dispatch) => {
    const episode = (await axios.put(`/api/episodes/views/${spotify_id}`)).data;
    dispatch(_updateEpisodeViews(episode));
  };
};

export const deleteEpisode = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/episodes/${id}`);
    dispatch(_deleteEpisode(id));
  };
};

//------------REDUCER------------//

export const episodes = (state = [], action) => {
  switch (action.type) {
    case GET_EPISODES:
      return action.episodes;

    case UPDATE_EPISODE:
      return state.map((episode) =>
        episode.id === action.episode.id ? action.episode : episode
      );
    case UPDATE_EPISODE_VIEWS:
      return state.map((episode) =>
        episode.id === action.episode.id ? action.episode : episode
      );
    case DELETE_EPISODE:
      return state.filter((episode) => episode.id !== action.id);
    default:
      return state;
  }
};
