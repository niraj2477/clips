import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
import { HOME, VIDEO_CREATE } from "../helpers/constants";
import Create from "../components/video/Create";
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
      <Route path={VIDEO_CREATE} exact element={<Create />} />
    </Routes>
  );
}
