import axios from 'axios'

//------------ACTION TYPES------------//

const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

//------------ACTION CREATORS------------//

const _getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
};

const _addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
};

const _updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
};

const _deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  }
};

//------------THUNKS------------//

export const getComments = () => {
  return async(dispatch) => {
    const comments = (await axios.get('/api/comments')).data;
    dispatch(_getComments(comments));
  }
};

export const addComment = (comment) => {
  return async(dispatch) => {
    const newComment = (await axios.post('/api/comments'), comment).data;
    dispatch(_addComment(newComment));
  }
};

export const updateComment = (comment) => {
  return async(dispatch) => {
    comment = (await axios.put(`/api/comments/${comment.id}`, comment)).data;
    dispatch(_updateComment(comment));
  }
};

export const deleteComment = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/comments/${id}`);
    dispatch(_deleteComment(id));
  }
}

//------------REDUCER------------//

export const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case ADD_COMMENT:
      return [...state, action.comment]
    case UPDATE_COMMENT:
      return state.map((comment) => comment.id === action.comment.id ? action.comment : comment)
    case DELETE_COMMENT:
      return state.filter((comment) => comment !== action.id)
    default:
      return state
  }
}