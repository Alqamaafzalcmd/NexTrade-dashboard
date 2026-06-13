import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Flash from "./Flash";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Flash></Flash> */}
      <Routes>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
