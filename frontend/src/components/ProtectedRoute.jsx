// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({children}) => {
//      const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/home" />;
// }

// export default ProtectedRoute
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ token }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    axios
      .get("http://localhost:3000/api/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIsValid(res.data.valid))
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) return <p>Loading...</p>;

  return isValid ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
