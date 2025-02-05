import React from "react";
import useAuth from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Loader/Loader";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <Loader></Loader>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to='/' state={location.pathname}></Navigate>;
};

export default AdminRoute;
