import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
import { HOME, VIDEO_CREATE, TRENDING } from "../helpers/constants";
import Create from "../components/video/Create";
import Trending from "../components/trending/Trending"
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
      <Route path={VIDEO_CREATE} exact element={<Create />} />
      <Route path={TRENDING} exact element={<Trending />} />
    </Routes>
  );
}
