import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Flash from "../Flash"

const Home = () => {
  return (
    <>
      <TopBar />
      <Flash></Flash>
      <Dashboard />
    </>
  );
};

export default Home;
