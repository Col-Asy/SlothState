// src/components/GuestRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
