
//------------ACTION TYPES------------//

const SET_EPISODES = 'SET_EPISODES';

//------------ACTION CREATORS------------//

const _setEpisodes = (episodes) => {
  return {
    type: SET_EPISODES,
    episodes
  }
};

//------------THUNKS------------//

export const setEpisodes = (episodes) => {
  return (dispatch) => {
    dispatch(_setEpisodes(episodes));
  }
};

//------------REDUCER------------//

export const searchEpisodes = (state = {}, action) => {
  switch (action.type) {
    case SET_EPISODES:
      return action.episodes;
    default:
      return state;
  }

};
