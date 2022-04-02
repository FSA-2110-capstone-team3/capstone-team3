import axios from 'axios'

//------------ACTION TYPES------------//

const GET_SUBSCRIBED_SHOWS = 'GET_SUBSCRIBED_SHOWS';

//------------ACTION CREATORS------------//

const _getSubscribedShows = (subscribedShows) => {
  return {
    type: GET_SUBSCRIBED_SHOWS,
    subscribedShows
  }
};

//------------THUNKS------------//

export const getSubscribedShows = (info) => {
  return async (dispatch) => {
    const subscribedShows = await axios.post("/api/shows/spotify/saved", {
      userId: info.userId
    });
    dispatch(_getSubscribedShows(subscribedShows));
  }
};

//------------REDUCER------------//

export const subscribedShows = (state = [], action) => {
  switch (action.type) {
    case GET_SUBSCRIBED_SHOWS:
      return action.subscribedShows.data.items;
    default:
      return state;
  }
};
