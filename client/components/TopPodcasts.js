import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TopPodcasts extends Component {
  render() {
    const { topCharts } = this.props;

    /* Example for Priscilla - this is how you can grab first 4 in home component
    let { topCharts } = this.props;
    topCharts = topCharts.slice(0, 4);
    */

    let rank = 1;
    return (
      // <div>
      //   {topCharts.map((podcast) => {
      //     return (
      //       <div key={podcast.showUri} className="p-2">
      //         <div>{`${rank++}.`}</div>
      //         <Link to={`/show/${podcast.showUri.slice(-22)}`}>
      //           <span style={{ fontWeight: "bold", color: "rgb(33,37,41)" }}>
      //             {podcast.showName}
      //           </span>
      //         </Link>
      //         <div>
      //           <img src={podcast.showImageUrl} />
      //         </div>
      //         <div>{podcast.showPublisher}</div>
      //       </div>
      //     );
      //   })}
      // </div>
      // <div id="podcastCards">
      //   {topCharts.map((podcast) => {
      //     return (
      //       <div className="container page-container">
      //         <div className="row gutters">
      //           <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
      //             <figure class="user-card green">
      //               <figcaption>
      //                 <img
      //                   src={podcast.showImageUrl}
      //                   alt="Milestone Admin"
      //                   class="profile"
      //                 />
      //                 <h5>
      //                   {" "}
      //                   <Link to={`/show/${podcast.showUri.slice(-22)}`}>
      //                     <span
      //                       style={{
      //                         fontWeight: "bold",
      //                         color: "rgb(33,37,41)",
      //                       }}
      //                     >
      //                       {podcast.showName}
      //                     </span>
      //                   </Link>
      //                 </h5>
      //                 <h6>{podcast.showPublisher}</h6>
      //                 {/* <p>
      //                   On the 28th of October 2016 we completed a 3-part
      //                   transaction with the contractor.
      //                 </p> */}

      //                 {/* <div class="clearfix">
      //                   <span class="badge badge-pill badge-info">#HTML5</span>
      //                   <span class="badge badge-pill badge-success">
      //                     #CSS3
      //                   </span>
      //                   <span class="badge badge-pill badge-orange">
      //                     #Angular JS
      //                   </span>
      //                 </div> */}
      //               </figcaption>
      //             </figure>
      //           </div>
      //         </div>
      //       </div>
      //     );
      //   })}
      // </div>

      // <div id="allPodcasts">
      //   <h1 style={{ marginLeft: 30 + "px", margin: 30 + "px" }}>
      //     TOP CHARTS:{" "}
      //   </h1>
      //   <div className="col">
      //     <ul id="podcastCards">
      //       {topCharts.map((podcast) => (
      //         <li>
      //           <ul id="card">
      //             <li style={{ listStyleType: "none" }}>
      //               <img src={podcast.showImageUrl} />
      //             </li>
      //             <li style={{ listStyleType: "none" }}>
      //               <h5 style={{ textAlign: "center" }}>
      //                 {" "}
      //                 <Link to={`/show/${podcast.showUri.slice(-22)}`}>
      //                   <span
      //                     style={{
      //                       fontWeight: "bold",
      //                       color: "rgb(33,37,41)",
      //                     }}
      //                   >
      //                     {podcast.showName}
      //                   </span>
      //                 </Link>
      //               </h5>
      //             </li>
      //             <li style={{ listStyleType: "none" }}>
      //               {" "}
      //               <h6 style={{ textAlign: "center" }}>
      //                 {podcast.showPublisher}
      //               </h6>
      //             </li>
      //           </ul>
      //         </li>
      //       ))}
      //     </ul>
      //   </div>
      // </div>

      <div>
        <h1 style={{ color: "white", fontWeight: 400 }}>TOP CHARTS:</h1>
        <div className="row p-5 m-2">
          {topCharts.map((podcast) => (
            <div className="col-lg-2" id="mainCard" key={podcast.showUri}>
              <div style={{ color: "white" }}>{`${rank++}.`}</div>
              <div className="card">
                <img
                  src={podcast.showImageUrl}
                  alt="podcastimg"
                  className="card-img-top"
                />
                <div className="card-body ">
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {" "}
                    <Link to={`/show/${podcast.showUri.slice(-22)}`}>
                      <span
                        className="card-text"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {podcast.showName}
                      </span>
                    </Link>
                  </h5>
                  <span className="card-text">
                    <h6
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "white",
                      }}
                    >
                      {podcast.showPublisher}
                    </h6>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ topCharts }) => {
  return {
    topCharts,
  };
};

export default connect(mapStateToProps)(TopPodcasts);
