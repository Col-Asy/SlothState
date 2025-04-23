// src/components/GuestRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoaderComponent from "./LoaderComponent";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div><LoaderComponent /></div>;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
