
//------------ACTION TYPES------------//

const SET_TIMESTAMPS = 'SET_TIMESTAMPS';

//------------ACTION CREATORS------------//

const _setTimeStamps = (timeStamps) => {
  return {
    type: SET_TIMESTAMPS,
    timeStamps
  }
};

//------------THUNKS------------//

export const setTimeStamps = (timeStamps) => {
  return (dispatch) => {
    dispatch(_setTimeStamps(timeStamps));
  }
};

//------------REDUCER------------//

export const searchTimeStamps = (state = [], action) => {
  switch (action.type) {
    case SET_TIMESTAMPS:
      return action.timeStamps;
    default:
      return state;
  }

};
