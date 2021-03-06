import axios from "axios";

//------------ACTION TYPES------------//

const GET_SAVED_EPISODES = "GET_SAVED_EPISODES";
const ADD_SAVED_EPISODE = "ADD_SAVED_EPISODE";
const DELETE_SAVED_EPISODE = "DELETE_SAVED_EPISODE";

//------------ACTION CREATORS------------//

const _getSavedEpisodes = (savedEpisodes) => {
  return {
    type: GET_SAVED_EPISODES,
    savedEpisodes,
  };
};

const _addSavedEpisode = (episodeToAdd) => {
  return {
    type: ADD_SAVED_EPISODE,
    episodeToAdd,
  };
};

const _deleteSavedEpisode = (id) => {
  return {
    type: DELETE_SAVED_EPISODE,
    id,
  };
};

//------------THUNKS------------//

export const getSavedEpisodes = (info) => {
  return async (dispatch) => {
    const savedEpisodes = await axios.post("/api/users/spotify/episodes", {
      userId: info.userId,
    });
    dispatch(_getSavedEpisodes(savedEpisodes));
  };
};

export const addSavedEpisode = (info) => {
  return async (dispatch) => {
    const episodeToAdd = await axios.post(`/api/users/spotify/add/${info.id}`, {
      userId: info.userId,
    });
    dispatch(_addSavedEpisode(episodeToAdd));
  };
};

export const deleteSavedEpisode = (info) => {
  return async (dispatch) => {
    await axios.post(`/api/users/spotify/remove/${info.id}`, {
      userId: info.userId,
    });
    dispatch(_deleteSavedEpisode(info.id));
  };
};

//------------REDUCER------------//

export const savedEpisodes = (state = [], action) => {
  switch (action.type) {
    case GET_SAVED_EPISODES:
      return action.savedEpisodes.data.items;
    case ADD_SAVED_EPISODE:
      return [...state, action.episodeToAdd];
    case DELETE_SAVED_EPISODE:
      return state.filter((fav) => fav.episode.id !== action.id);
    default:
      return state;
  }
};
