import { Navigate } from "react-router-dom";
import { auth } from "@/utils/firebase/firebase";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  if (!auth.currentUser) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export default RequireAuth;