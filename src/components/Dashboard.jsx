import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Main/Apps";
import Funds from "./Main/Funds";
import Holdings from "./Main/Holdings";

import Orders from "./Main/Orders";
import Positions from "./Main/Positions";
import Summary from "./Main/Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WatchList />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
