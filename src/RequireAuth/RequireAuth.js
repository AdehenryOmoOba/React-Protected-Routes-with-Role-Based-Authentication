import React from "react";
import { useAuthContext } from "../Authorization/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();
  const { auth, roles } = useAuthContext();
  const pathName = location.pathname.split("/")[1];
  const pathCodes = {
    professors: 111,
    hods: 222,
    lecturers: 333,
    students: 444,
    workers: 555,
  };

  if (auth === null) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  if (auth && roles.includes(pathCodes[pathName])) {
    return children;
  } else {
    return <Navigate to="/unauthorised" replace />;
  }
}

export default RequireAuth;
