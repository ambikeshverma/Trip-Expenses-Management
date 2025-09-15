import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from '../api';
import Home from "./Home";
import ShimmerModelOverlay from "./ShimmerModelOverlay";

const ProtectedRoute = ({ token }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    api
      .get("/api/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIsValid(res.data.valid))
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) return <><Home></Home><ShimmerModelOverlay></ShimmerModelOverlay></>;

  return isValid ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
