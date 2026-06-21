import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Flash from "../Flash";

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await axios.get("http://localhost:8080/auth/verify", {
  //         withCredentials: true,
  //       });
  //     } catch (error) {
  //       window.location.href = "http://localhost:5173/login";
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  return (
    <>
      <Flash />
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
