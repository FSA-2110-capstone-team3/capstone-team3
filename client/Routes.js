import axios from "axios";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter
} from "react-router-dom";
import {
  getEpisodes,
  getShows,
  getComments,
  getSavedEpisodes,
  getEpisodeLikes,
  getSubscribedShows,
  getTimeStamps,
  getTopCharts,
  getUsers,
  me,
} from "./store";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import SavedEpisodes from "./components/SavedEpisodes";
import Search from "./components/Search";
import SinglePodcast from "./components/SinglePodcast";
import SingleEpisode from "./components/SingleEpisode";
import SubscribedPodcasts from "./components/SubscribedPodcasts";
import TopPodcasts from "./components/TopPodcasts";
import UserDetails from "./components/UserDetails";
import History from "./components/History";
import AboutUs from "./components/AboutUs";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }


  componentDidMount() {
    const {
      getComments,
      getShows,
      getEpisodes,
      getEpisodeLikes,
      getTimeStamps,
      getTopCharts,
      getUsers,
      me,
    } = this.props;
    getComments();
    getShows();
    getEpisodes();
    getEpisodeLikes();
    getTimeStamps();
    getTopCharts();
    getUsers();
    me();

    //loading animation toggle for render evaluation
    const loadData = async () => {  
      await new Promise((r) => setTimeout(r, 500));
      this.setState({loading: false});
    }
    loadData();

  }

  componentDidUpdate() {
    const { userId, getSavedEpisodes, getSubscribedShows } = this.props;
    try {
      getSavedEpisodes({ userId: userId });
      getSubscribedShows({ userId: userId });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    // const location = window.location;

    if ( this.state.loading) {

      return (
        //all divs used for dotted circle animation (custom animation setup)
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div></div>
      );

    } else {

    return (
      <div>
        {isLoggedIn ? (
          <AnimatePresence exitBeforeEnter>
            <Switch>
            {/* <Switch location={location} key={location.pathname}> */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/saved" component={SavedEpisodes} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/show/:id" component={SinglePodcast} />
              <Route exact path="/episode/:id" component={SingleEpisode} />
              <Route exact path="/subscribed" component={SubscribedPodcasts} />
              <Route exact path="/topcharts" component={TopPodcasts} />
              <Route exact path="/userDetails" component={UserDetails} />
              <Route exact path="/history" component={History} />
              <Route exact path="/aboutUs" component={AboutUs} />
              <Redirect to="/home" />
            </Switch>
          </AnimatePresence>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <Switch>
            {/* <Switch location={location} key={location.pathname}> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/aboutUs" component={AboutUs} />
            </Switch>
          </AnimatePresence>
        )}
      </div>
    );
    } //if statement
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = {
  getComments,
  getEpisodes,
  getShows,
  getEpisodeLikes,
  getSavedEpisodes,
  getSubscribedShows,
  getTimeStamps,
  getTopCharts,
  getUsers,
  me,
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
