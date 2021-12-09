import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Index";
export default function Index() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
}
