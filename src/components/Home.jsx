import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

import Dashboard from "./Dashboard";
import { GeneralContextProvider } from "./GeneralContext";
import TopBar from "./TopBar";
import Flash from "../Flash";
import api from "./Checker";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const fetch = useRef(false);

  useEffect(() => {
    if (fetch.current) return;
    fetch.current = true;

    api
      .get(`/auth`, {
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
    return <Loader />;
  }

  if (!authenticated) {
    window.location.href = import.meta.env.VITE_FRONTEND_URL;
    return null;
  }

  return (
    <GeneralContextProvider>
      <Flash />
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;
