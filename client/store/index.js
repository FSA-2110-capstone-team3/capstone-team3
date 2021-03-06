import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import { commentLikes } from "./commentLike";
import { commentReplies } from "./commentReply";
import { comments } from "./comments";
import { episodeLikes } from "./episodeLike";
import { episodes } from "./episodes";
import { savedEpisodes } from "./savedEpisodes";
import { shows } from "./shows";
import { subscribedShows } from "./subscribedShows";
import { timeStamps } from "./timeStamps";
import { topCharts } from "./topCharts";
import { users } from "./users";
import { singleEpisode } from "./singleEpisode";
import { searchShows } from "./searchShows";
import { searchComments } from "./searchComments";
import { searchTimeStamps } from "./searchTimeStamps";
import { searchEpisodes } from "./searchEpisodes";

const reducer = combineReducers({
  auth,
  commentLikes,
  commentReplies,
  comments,
  episodeLikes,
  episodes,
  savedEpisodes,
  shows,
  subscribedShows,
  timeStamps,
  topCharts,
  users,
  singleEpisode,
  searchShows,
  searchComments,
  searchTimeStamps,
  searchEpisodes
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./commentLike";
export * from "./commentReply";
export * from "./comments";
export * from "./episodeLike";
export * from "./episodes";
export * from "./savedEpisodes";
export * from "./shows";
export * from "./subscribedShows";
export * from "./timeStamps";
export * from "./topCharts";
export * from "./users";
export * from "./singleEpisode";
export * from "./searchShows";
export * from "./searchComments";
export * from "./searchTimeStamps";
export * from "./searchEpisodes";
