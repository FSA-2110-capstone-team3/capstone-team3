import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "..";

function AboutUs() {
  return (
    <motion.div initial="out" exit="out" animate="in" variants={pageTransition}>
      <div className="container p-2 m-5" style={{ color: "white" }}>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-6">
                <div className="row">
                  <div className="col-lg-12 col-md-12 mt-4 pt-2">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src="/spotify.png"
                        className="img-fluid"
                        alt="Image"
                        id="aboutUsImg"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
                  {/* <!--end col--> */}

                  <div className="col-12">
                    <div className="mt-4 pt-2 text-right">
                      {/* <a href="javascript:void(0)" class="btn btn-info">
                        Read More <i class="mdi mdi-chevron-right"></i>
                      </a> */}
                    </div>
                  </div>
                </div>
                {/* <!--end row--> */}
              </div>
              {/* <!--end col--> */}

              <div className="col-lg-6 col-md-6 col-6">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src="/listen2.png"
                        className="img-fluid"
                        alt="Image"
                        id="aboutUsImg"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
                  {/* <!--end col--> */}

                  <div className="col-lg-12 col-md-12 mt-4 pt-2">
                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src="/comments.png"
                        className="img-fluid"
                        alt="Image"
                        id="aboutUsImg"
                      />
                      <div className="img-overlay bg-dark"></div>
                    </div>
                  </div>
                  {/* <!--end col--> */}
                </div>
                {/* <!--end row--> */}
              </div>
              {/* <!--end col--> */}
            </div>
            {/* <!--end row--> */}
          </div>
          {/* <!--end col--> */}

          <div className="col-lg-6 col-md-6 col-12 order-1 order-md-2">
            <div className="section-title ml-lg-5">
              <h2 className="text-custom font-weight-normal mb-3">About Us</h2>
              <h4 className="title mb-4">
                Welcome to Podify! <br />
              </h4>
              <p className="text-muted mb-0" style={{ fontSize: "20px" }}>
                Here at Podify, our mission is to provide an enriching social
                environment where users can access any podcast and connect with
                other users from different parts of the world. We hope that
                Podify brings a new invigorating experience for anyone who has
                an interest in listening to and sharing their ideas about their
                favorite podcasts.
              </p>

              <div className="row">
                <div className="col-lg-6 mt-4 pt-2">
                  <button id="getStarted">
                    <a href="/signup" style={{ color: "white" }} id="started">
                      Get Started
                    </a>
                  </button>
                </div>

                <div class="col-lg-6 mt-4 pt-2">
                  <button id="getStarted">
                    <a
                      href="mailto:podify@podify.com"
                      style={{ color: "white" }}
                      id="started"
                    >
                      Contact Us
                    </a>
                  </button>
                </div>
                {/*
                <div class="col-lg-6 mt-4 pt-2">
                  <div
                    class="media align-items-center rounded shadow p-3"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    <i class="fa fa-user h4 mb-0 text-custom"></i>
                    <h6 class="ml-3 mb-0">
                      <a href="javascript:void(0)" class="text-dark">
                        LIKED?
                      </a>
                    </h6>
                  </div>
                </div>
                <div class="col-lg-6 mt-4 pt-2">
                  <div
                    class="media align-items-center rounded shadow p-3"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    <i class="fa fa-image h4 mb-0 text-custom"></i>
                    <h6 class="ml-3 mb-0">
                      <a href="javascript:void(0)" class="text-dark">
                        COMMENTS?
                      </a>
                    </h6>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <!--end col--> */}
        </div>
      </div>
    </motion.div>
  );
}

export default AboutUs;
