import axios from "axios";

//------------ACTION TYPES------------//

const GET_SUBSCRIBED_SHOWS = "GET_SUBSCRIBED_SHOWS";
const DELETE_SUBSCRIBED_SHOW = "DELETE_SUBSCRIBED_SHOW";

//------------ACTION CREATORS------------//

const _getSubscribedShows = (subscribedShows) => {
  return {
    type: GET_SUBSCRIBED_SHOWS,
    subscribedShows,
  };
};

const _deleteSubscribedShow = (id) => {
  return {
    type: DELETE_SUBSCRIBED_SHOW,
    id,
  };
};

//------------THUNKS------------//

export const getSubscribedShows = (info) => {
  return async (dispatch) => {
    const subscribedShows = await axios.post("/api/shows/spotify/saved", {
      userId: info.userId,
    });
    dispatch(_getSubscribedShows(subscribedShows));
  };
};

export const deleteSubscribedShow = (info) => {
  return async (dispatch) => {
    await axios.post(`/api/shows/spotify/remove/${info.id}`, {
      userId: info.userId,
    });
    dispatch(_deleteSubscribedShow(info.id));
  };
};

//------------REDUCER------------//

export const subscribedShows = (state = [], action) => {
  switch (action.type) {
    case GET_SUBSCRIBED_SHOWS:
      return action.subscribedShows.data.items;
    case DELETE_SUBSCRIBED_SHOW:
      return state.filter(
        (subscribedShow) => subscribedShow.show.id !== action.id
      );
    default:
      return state;
  }
};
