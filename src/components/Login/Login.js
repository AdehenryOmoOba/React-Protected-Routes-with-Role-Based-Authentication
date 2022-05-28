import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const usernameRef = useRef();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, setError, setRoles } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const redirect = location.state?.path || "/";

  const loginHandler = () => {
    const userData = { username, password };
    console.log(userData);
    navigate("/loading");
    const usersURL = `http://localhost:5000/login`;
    axios
      .post(usersURL, userData)
      .then((response) => {
        console.log(response);
        if (response.data.username) {
          console.log(response.data.username);
          login(response.data.username);
          setRoles(response.data.roles);
          navigate(redirect, { replace: true });
          return;
        } else {
          throw Error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        login(null);
        navigate("/invaliduser");
      });
  };

  return (
    <main>
      <p>Please login with your credentials!</p>
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
        <button id="login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </main>
  );
}

export default Login;
