import axios from "axios";

//------------ACTION TYPES------------//

const GET_SAVED_EPISODES = "GET_SAVED_EPISODES";

//------------ACTION CREATORS------------//

const _getSavedEpisodes = (savedEpisodes) => {
  return {
    type: GET_SAVED_EPISODES,
    savedEpisodes,
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

//------------REDUCER------------//

export const savedEpisodes = (state = [], action) => {
  switch (action.type) {
    case GET_SAVED_EPISODES:
      return action.savedEpisodes;
    default:
      return state;
  }
};
