import axios from "axios";

//------------ACTION TYPES------------//

const GET_SINGLE_EPISODE = 'GET_SINGLE_EPISODE';


//------------ACTION CREATORS------------//

const _getSingleEpisode = (episode) => {
  return {
    type: GET_SINGLE_EPISODE,
    episode
  }
};

//------------THUNKS------------//

export const getSingleEpisode = (info) => {
  return async(dispatch) => {
    const episode = (await axios.post(`/api/episodes/${info.id}`, {access_token: info.access_token, userId: info.userId})).data;
    dispatch(_getSingleEpisode(episode));
  }
};

//------------REDUCER------------//

export const singleEpisode = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EPISODE:
      return action.episode
    default:
      return state
  }
}