import React, { createContext, useState, useContext } from "react";

const usersContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);

  const login = (userInfo) => {
    setAuth(userInfo);
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <usersContext.Provider
      value={{ auth, login, logout, error, setError, roles, setRoles }}
    >
      {children}
    </usersContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(usersContext);
};

export default AuthProvider;
