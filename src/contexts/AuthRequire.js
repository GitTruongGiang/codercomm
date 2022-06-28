import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components.js/LoadingScreen";
import useAuth from "../hooks/useAuth";

const AuthRequire = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default AuthRequire;