import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";

const LOGIN = gql`
  query userLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      error
      roles
      username
    }
  }
`;

function Login() {
  const usernameRef = useRef();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading }] = useLazyQuery(LOGIN, {
    variables: { username, password },
  });

  const { login, setError, setRoles } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const redirect = location.state?.path || "/";

  function loginHandler() {
    loginUser()
      .then((result) => {
        if (result.error) {
          throw Error(`Connection error: ${result.error.message}`);
        }

        if (result.data.login.success) {
          login(result.data.login.username);
          setRoles(result.data.login.roles);
          navigate(redirect, { replace: true });
        }

        if (result.data.login.error) {
          throw Error(result.data.login.error);
        }
      })
      .catch((error) => {
        setError(error.message);
        login(null);
        navigate("/invaliduser");
      });
  }

  if (loading) {
    return <main style={{ fontSize: "2rem" }}>Loading...</main>;
  } else {
    return (
      <main>
        <p>Login here!</p>
        <div className="formControl">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnDiv">
          <button id="login-btn" onClick={() => loginHandler()}>
            Login
          </button>
        </div>
      </main>
    );
  }
}

export default Login;
