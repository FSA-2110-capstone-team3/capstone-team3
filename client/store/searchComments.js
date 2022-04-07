
//------------ACTION TYPES------------//

const SET_COMMENTS = 'SET_COMMENTS';

//------------ACTION CREATORS------------//

const _setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    comments
  }
};

//------------THUNKS------------//

export const setComments = (comments) => {
  return (dispatch) => {
    dispatch(_setComments(comments));
  }
};

//------------REDUCER------------//

export const searchComments = (state = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    default:
      return state;
  }

};
