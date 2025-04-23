// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoaderComponent from "./LoaderComponent";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div><LoaderComponent /></div>;
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;