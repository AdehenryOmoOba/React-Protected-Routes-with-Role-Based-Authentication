import React, { createContext, useState, useContext } from "react";

const usersContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [path, setPath] = useState("");

  const login = (userInfo) => {
    setAuth(userInfo);
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <usersContext.Provider
      value={{
        auth,
        login,
        logout,
        error,
        setError,
        role,
        setRole,
        path,
        setPath,
      }}
    >
      {children}
    </usersContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(usersContext);
};

export default AuthProvider;
