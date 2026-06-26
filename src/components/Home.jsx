import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth", {
        withCredentials: true,
      })
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (!authenticated) {
    window.location.href = "http://localhost:5173/login";
    return null;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
