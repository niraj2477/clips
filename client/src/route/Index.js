import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
import {
  HOME,
  VIDEO_CREATE,
  TRENDING,
  VIDEO_WATCH,
  ADMIN_CATEGORY
} from "../helpers/constants";
import Create from "../components/video/Create";
import Watch from "../components/video/Watch"
import Trending from "../components/trending/Trending"
import Category from "../admin/Category"
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
      <Route path={VIDEO_CREATE} exact element={<Create />} />
      <Route path={VIDEO_WATCH} exact element={<Watch  />}></Route>
      <Route path={TRENDING} exact element={<Trending />} />

      <Route path={ADMIN_CATEGORY} exact element={<Category />} />
    </Routes>
  );
}
