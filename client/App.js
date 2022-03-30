import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div
      className="main"
      style={{
        fontFamily: "roboto !important",

        color: "white !important",
      }}
    >
      <nav className="wrapper">
        <Navbar />
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
};

export default App;
