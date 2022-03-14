import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Show from "./components/Show";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import queryString from "query-string";
import axios from "axios";

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    try {
      this.props.loadInitialData();

      // let parsed = queryString.parse(window.location.search);
      // console.log(parsed.access_token);
      // // const headers = `Authorization: Bearer ${parsed.access_token}`;
      // const shows = (await axios.get('https://api.spotify.com/v1/shows/38bS44xjbVVZ3No3ByF1dJ?market=ES', {
      // // params: { limit: 50, offset: 0 },
      // headers: {
      //   Accept: 'application/json',
      //   Authorization: 'Bearer ' + parsed.access_token,
      //   'Content-Type': 'application/json'
      // }
      // })).data;
      // console.log(shows);
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/show" component={Show} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
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
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
