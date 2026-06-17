import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Flash from "../Flash";

const Home = () => {
  return (
    <>
      <Flash />
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
