import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
import Login from "../components/login/Login";
import Feedback from "../components/feedback/Index";
import {
  HOME,
  CATEGORY,
  LOGIN,
  FEEDBACK

} from "../helpers/constants";
// import Category from "../admin/Category"
import Category from "../components/category/Index"
export default function Index() {
  return (
    <Routes>
      <Route path={HOME} exact element={<Home />} />
      <Route path={CATEGORY} exact element={<Category />} /> 
      <Route path={FEEDBACK} exact element={<Feedback />} /> 
      <Route path={LOGIN} exact element={<Login />} /> 
    </Routes>
  );
}
