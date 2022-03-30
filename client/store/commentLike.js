import axios from 'axios'

//------------ACTION TYPES------------//

const GET_COMMENT_LIKES = 'GET_COMMENT_LIKES';
const ADD_COMMENT_LIKE = 'ADD_COMMENT_LIKE';
const UPDATE_COMMENT_LIKE = 'UPDATE_COMMENT_LIKE';
const DELETE_COMMENT_LIKE = 'DELETE_COMMENT_LIKE';

//------------ACTION CREATORS------------//

const _getCommentLikes = (commentLikes) => {
  return {
    type: GET_COMMENT_LIKES,
    commentLikes
  }
};

const _addCommentLike = (commentLike) => {
  return {
    type: ADD_COMMENT_LIKE,
    commentLike
  }
};

const _updateCommentLike = (commentLike) => {
  return {
    type: UPDATE_COMMENT_LIKE,
    commentLike
  }
};

const _deleteCommentLike = (id) => {
  return {
    type: DELETE_COMMENT_LIKE,
    id
  }
};

//------------THUNKS------------//

export const getCommentLikes = () => {
  return async(dispatch) => {
    const commentLikes = (await axios.get('/api/commentLikes')).data;
    dispatch(_getCommentLikes(commentLikes));
  }
};

export const addCommentLike = (commentLike) => {
  return async(dispatch) => {
    const newCommentLike = (await axios.post('/api/commentLikes', commentLike)).data;
    dispatch(_addCommentLike(newCommentLike));
  }
};

export const updateCommentLike = (commentLike) => {
  return async(dispatch) => {
    commentLike = (await axios.put(`/api/commentLikes/${commentLike.id}`, commentLike)).data;
    dispatch(_updateCommentLike(commentLike));
  }
};

export const deleteCommentLike = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/commentLikes/${id}`);
    dispatch(_deleteCommentLike(id));
  }
}

//------------REDUCER------------//

export const commentLikes = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENT_LIKES:
      return action.commentLikes
    case ADD_COMMENT_LIKE:
      return [...state, action.commentLike]
    case UPDATE_COMMENT_LIKE:
      return state.map((commentLike) => commentLike.id === action.commentLike.id ? action.commentLike : commentLike)
    case DELETE_COMMENT_LIKE:
      return state.filter((commentLike) => commentLike.id !== action.id)
    default:
      return state
  }
}