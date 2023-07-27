import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem("username");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
