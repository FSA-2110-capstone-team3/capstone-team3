
//------------ACTION TYPES------------//

const SET_SHOWS = 'SET_SHOWS';

//------------ACTION CREATORS------------//

const _setShows = (shows) => {
  return {
    type: SET_SHOWS,
    shows
  }
};

//------------THUNKS------------//

export const setShows = (shows) => {
  return (dispatch) => {
    dispatch(_setShows(shows));
  }
};

//------------REDUCER------------//

export const searchShows = (state = {}, action) => {
  switch (action.type) {
    case SET_SHOWS:
      return action.shows;
    default:
      return state;
  }
  
};
