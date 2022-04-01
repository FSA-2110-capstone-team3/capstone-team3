import React from "react";

function AboutUs() {
  return (
    <>
      <h1>(ABOUT US PAGE)</h1>
      <div class="container p-2 m-5" style={{ color: "white" }}>
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-6 col-6">
                <div class="row">
                  <div class="col-lg-12 col-md-12 mt-4 pt-2">
                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img src="/mic.png" class="img-fluid" alt="Image" />
                      <div class="img-overlay bg-dark"></div>
                    </div>
                  </div>
                  {/* <!--end col--> */}

                  <div class="col-12">
                    <div class="mt-4 pt-2 text-right">
                      {/* <a href="javascript:void(0)" class="btn btn-info">
                        Read More <i class="mdi mdi-chevron-right"></i>
                      </a> */}
                    </div>
                  </div>
                </div>
                {/* <!--end row--> */}
              </div>
              {/* <!--end col--> */}

              <div class="col-lg-6 col-md-6 col-6">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src="https://via.placeholder.com/337x450/87CEFA/000000"
                        class="img-fluid"
                        alt="Image"
                      />
                      <div class="img-overlay bg-dark"></div>
                    </div>
                  </div>
                  {/* <!--end col--> */}

                  <div class="col-lg-12 col-md-12 mt-4 pt-2">
                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                      <img
                        src="/comments.png
                        "
                        class="img-fluid"
                        alt="Image"
                      />
                      <div class="img-overlay bg-dark"></div>
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

          <div class="col-lg-6 col-md-6 col-12 order-1 order-md-2">
            <div class="section-title ml-lg-5">
              <h2 class="text-custom font-weight-normal mb-3">About Us</h2>
              <h4 class="title mb-4">
                Our mission is to <br />
                make your life easier.
              </h4>
              <p class="text-muted mb-0">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit quod
                debitis praesentium pariatur temporibus ipsa, cum quidem
                obcaecati sunt?
              </p>

              <div class="row">
                <div class="col-lg-6 mt-4 pt-2">
                  <div
                    class="media align-items-center rounded shadow p-3"
                    id="box1"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "green",
                    }}
                  >
                    <i class="fa fa-play h4 mb-0 text-custom"></i>
                    <h6 class="ml-3 mb-0">
                      <a href="/signUp" class="text-dark">
                        Get Started
                      </a>
                    </h6>
                  </div>
                </div>
                {/* <div class="col-lg-6 mt-4 pt-2">
                  <div
                    class="media align-items-center rounded shadow p-3"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    <i class="fa fa-play h4 mb-0 text-custom"></i>
                    <h6 class="ml-3 mb-0">
                      <a href="/subscribed" class="text-dark">
                        SUBSCRIBED
                      </a>
                    </h6>
                  </div>
                </div>
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
    </>
  );
}

export default AboutUs;
