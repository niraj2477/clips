import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
import {
  HOME,

} from "../helpers/constants";
// import Category from "../admin/Category"
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
{/* 
      <Route path={ADMIN_CATEGORY} exact element={<Category />} /> */}
    </Routes>
  );
}
