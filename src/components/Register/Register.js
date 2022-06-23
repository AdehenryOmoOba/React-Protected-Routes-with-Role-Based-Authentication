import React, { useState, useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../Spinner/Spinner";
import "./Register.css";

const REGISTER = gql`
  mutation registerUser($registerData: Register) {
    register(registerData: $registerData) {
      successResponse
      errorResponse
      id
      username
    }
  }
`;

function Register() {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerUser, { data }] = useMutation(REGISTER);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  async function registerHandler() {
    setLoading(true);
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const response = await registerUser({
        variables: {
          registerData: { username, password, confirmPassword, phone },
        },
      });
      setLoading(false);
      const {
        data: {
          register: { errorResponse },
        },
      } = response;

      if (errorResponse) {
        throw new Error(errorResponse);
        return;
      }
      setRegisterSuccess("success: registration successful!");
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  } else {
    return (
      <main>
        {registerError && <p id="register-error">{registerError}</p>}
        {registerSuccess && <p id="register-success">{registerSuccess}</p>}
        <p>Register here!</p>
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
          <label htmlFor="phone">Telephone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div className="formControl">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="btnDiv">
          <button id="login-btn" onClick={() => registerHandler()}>
            Register
          </button>
        </div>
      </main>
    );
  }
}

export default Register;
