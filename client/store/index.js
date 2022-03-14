import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import { commentLikes } from './commentLike'
import { commentReplies } from './commentReply'
import { comments } from './comments'
import { episodeLikes } from './episodeLike'
import { episodes } from './episodes'
import { shows } from './shows'
import { timeStamps } from './timeStamps'
import { users } from './users'

const reducer = combineReducers(
  { 
    auth,
    commentLikes,
    commentReplies,
    comments,
    episodeLikes,
    episodes,
    shows,
    timeStamps,
    users 
  }
);

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

const store = createStore(reducer, middleware);

export default store
export * from './auth'
export * from './commentLike'
export * from './commentReply'
export * from './comments'
export * from './episodeLike'
export * from './episodes'
export * from './shows'
export * from './timeStamps'
export * from './users'
