import axios from "axios";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { me, getTimeStamps, getComments, getUsers } from "./store";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import SinglePodcast from "./components/SinglePodcast";
import SingleEpisode from "./components/SingleEpisode";
import SubscribedPodcasts from "./components/SubscribedPodcasts";
import TopPodcasts from "./components/TopPodcasts";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/subscribed" component={SubscribedPodcasts} />
            <Route exact path="/topcharts" component={TopPodcasts} />
            <Route exact path="/show/:id" component={SinglePodcast} />
            <Route exact path="/episode/:id" component={SingleEpisode} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/show/:id" component={SinglePodcast} />
            <Route path="/episode/:id" component={SingleEpisode} />
            <Route path="/topcharts" component={TopPodcasts} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getComments());
      dispatch(getUsers());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
