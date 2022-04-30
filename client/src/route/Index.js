import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";


import {
  HOME,
  VIDEO_CREATE,
  TRENDING,
  VIDEO_WATCH,
  FEEDBACK,
  HISTORY,
  CREATOR
} from "../helpers/constants";
import Create from "../components/video/Create";
import Watch from "../components/video/Watch"
import Trending from "../components/trending/Trending"
import Feedback from "../components/feedback/Index";
import Creator from "../components/creator/Creator"
import History from "../components/history/History";

// import Category from "../admin/Category"
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
      <Route path={VIDEO_CREATE} exact element={<Create />} />
      <Route path={VIDEO_WATCH} exact element={<Watch />}></Route>
      <Route path={TRENDING} exact element={<Trending />} />
      <Route path={FEEDBACK} exact element={<Feedback />} />
      <Route path={CREATOR} exact element={<Creator />}  />
      <Route path={HISTORY} exact element={<History />}  />
      {/* 
      <Route path={ADMIN_CATEGORY} exact element={<Category />} /> */}
    </Routes>
  );
}
