import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubscribedShows } from "../store/subscribedShows";
import { Link } from "react-router-dom";

class userDetails extends Component {
  componentDidMount() {
    const { auth, getSubscribedShows, email } = this.props;
    const userId = auth.id;
    try {
      getSubscribedShows({ userId: userId });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { email, subscribedShows } = this.props;

    let username = email.split("@");
    const userShows = subscribedShows.data?.items.slice(0, 5) || [];

    return (
      <>
        <h1>User Details Page</h1>
        {/* <div
        className="container bootstrap snippets bootdey"
        style={{ color: "white" }}
      > */}
        <hr />
        <div>
          <div className="row" style={{ color: "white" }}>
            {/* <!-- left column --> col-md-3 */}
            <div className="row">
              <div className="col-sm-2">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="avatar img-thumbnail rounded-circle mx-auto d-block"
                  alt="avatar"
                  style={{ width: "200px", height: "200px" }}
                />
                {/* <div className="row">
                <div className="col-sm-6">Followers: </div>
                <div className="col-sm-6">Following: </div>
              </div> */}
                {/* <h6>Upload a different photo...</h6> */}
              </div>
              {/* <input type="file" class="form-control" /> */}
              <div className="col-sm-8 pt-5">
                <div>
                  <h2>{`@${username[0]}`}</h2>
                  <div className="col-sm" style={{ fontSize: "25px" }}>
                    Followers: 0
                  </div>
                  <div className="col-sm" style={{ fontSize: "25px" }}>
                    Following: 0
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <hr />
            </div>

            {/* <!-- edit form column --> */}
            <div className="col-md personal-info p-2 m-2">
              {/* <div className="alert alert-info alert-dismissable">
              <a className="panel-close close" data-dismiss="alert">
                ×
              </a>
              <i className="fa fa-coffee"></i>
              This is an <strong>.alert</strong>. Use this to show important
              messages to the user.
            </div> */}

              {/* <h3>Personal info</h3> */}

              <form className="form-horizontal p-4">
                <div>
                  <div>
                    <a href="/subscribed" style={{ color: "white" }}>
                      Subscribed:
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    {userShows.map((podcast) => {
                      return (
                        <div className="col-sm-2" key={podcast.show.id}>
                          <div
                            className="card "
                            style={{ width: "200px", height: "200px" }}
                          >
                            <Link
                              to={`/show/${podcast.show.id}`}
                              className="stretched-link"
                            >
                              <img
                                src={podcast.show.images[1].url}
                                alt="podcastimg"
                                className="card-img-top"
                              />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div>Liked:</div>
                  <hr />
                </div>

                <div>
                  <div>Comments:</div>
                  <hr />
                </div>
                {/*
              <div class="form-group">
                <label class="col-lg-3 control-label">Password:</label>
                <div class="col-lg-8">
                  <input class="form-control" type="text" value="bootdey" />
                </div>
              </div>

              <div class="form-group">
                <label class="col-lg-3 control-label">Company:</label>
                <div class="col-lg-8">
                  <input class="form-control" type="text" value="" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Email:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value="janesemail@gmail.com"
                  />
                </div>
              </div> */}
              </form>
            </div>
          </div>
          {/* </div> */}
          <hr></hr>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    email: state.auth.email,
    subscribedShows: state.subscribedShows,
    auth: state.auth,
  };
};

const mapDispatchToProps = { getSubscribedShows };

export default connect(mapState, mapDispatchToProps)(userDetails);
