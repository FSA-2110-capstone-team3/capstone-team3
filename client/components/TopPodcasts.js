import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TopPodcasts extends Component {
  constructor() {
    super();
    this.state = {
      topCharts: [],
    };
  }

  async componentDidMount() {
    try {
      // Returns top 200
      const topCharts = (await axios.get("/api/shows/topcharts")).data;
      this.setState({
        topCharts: topCharts.slice(0, 25), // Limit to top 25
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { topCharts } = this.state;
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

      <div id="allPodcasts">
        <ul id="podcastCards">
          {topCharts.map((podcast) => (
            <li>
              <ul id="card">
                <li>
                  <img src={podcast.showImageUrl} />
                </li>
                <li>
                  <h5>
                    {" "}
                    <Link to={`/show/${podcast.showUri.slice(-22)}`}>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "rgb(33,37,41)",
                        }}
                      >
                        {podcast.showName}
                      </span>
                    </Link>
                  </h5>
                </li>
                <li>
                  {" "}
                  <h6>{podcast.showPublisher}</h6>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TopPodcasts;
