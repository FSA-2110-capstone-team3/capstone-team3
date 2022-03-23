import axios from 'axios'

//------------ACTION TYPES------------//

const GET_COMMENT_REPLIES = 'GET_COMMENT_REPLIES';
const ADD_COMMENT_REPLY = 'ADD_COMMENT_REPLY';
const UPDATE_COMMENT_REPLY = 'UPDATE_COMMENT_REPLY';
const DELETE_COMMENT_REPLY = 'DELETE_COMMENT_REPLY';

//------------ACTION CREATORS------------//

const _getCommentReplies = (commentReplies) => {
  return {
    type: GET_COMMENT_REPLIES,
    commentReplys
  }
};

const _addCommentReply = (commentReply) => {
  return {
    type: ADD_COMMENT_REPLY,
    commentReply
  }
};

const _updateCommentReply = (commentReply) => {
  return {
    type: UPDATE_COMMENT_REPLY,
    commentReply
  }
};

const _deleteCommentReply = (id) => {
  return {
    type: DELETE_COMMENT_REPLY,
    id
  }
};

//------------THUNKS------------//

export const getCommentReplies = () => {
  return async(dispatch) => {
    const commentReplies = (await axios.get('/api/commentReplies')).data;
    dispatch(_getCommentReplies(commentReplies));
  }
};

export const addCommentReply = (commentReply) => {
  return async(dispatch) => {
    const newCommentReply = (await axios.post('/api/commentReplies', commentReply)).data;
    dispatch(_addCommentReply(newCommentReply));
  }
};

export const updateCommentReply = (commentReply) => {
  return async(dispatch) => {
    commentReply = (await axios.put(`/api/commentReplies/${commentReply.id}`, commentReply)).data;
    dispatch(_updateCommentReply(commentReply));
  }
};

export const deleteCommentReply = (id) => {
  return async(dispatch) => {
    await axios.delete(`/api/commentReplies/${id}`);
    dispatch(_deleteCommentReply(id));
  }
}

//------------REDUCER------------//

export const commentReplies = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENT_REPLIES:
      return action.commentReplys
    case ADD_COMMENT_REPLY:
      return [...state, action.commentReply]
    case UPDATE_COMMENT_REPLY:
      return state.map((commentReply) => commentReply.id === action.commentReply.id ? action.commentReply : commentReply)
    case DELETE_COMMENT_REPLY:
      return state.filter((commentReply) => commentReply !== action.id)
    default:
      return state
  }
}