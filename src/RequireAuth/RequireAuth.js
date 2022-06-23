import React from "react";
import { useAuthContext } from "../Authorization/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();
  const { auth, role, setError, setPath } = useAuthContext();

  let pathName = location.pathname.split("/")[1];

  const pathCodes = {
    professors: ["professors"],
    hods: ["professors", "hods"],
    lecturers: ["professors", "hods", "lecturers"],
    students: ["professors", "hods", "lecturers", "students"],
    workers: ["professors", "hods", "lecturers", "students", "workers"],
  };

  if (auth === null) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  if (!pathCodes[pathName].includes(role)) {
    setError(`You are unauthorised to view this page`);
    return <Navigate to="/unauthorised" replace />;
  }

  if (auth) {
    setPath("");
    return children;
  }
}

export default RequireAuth;
