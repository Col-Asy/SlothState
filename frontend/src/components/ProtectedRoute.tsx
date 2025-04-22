// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/utils/firebase/firebase";

const ProtectedRoute = () => {
  // Checks if a user is logged in
  const isAuthenticated = !!auth.currentUser;
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
