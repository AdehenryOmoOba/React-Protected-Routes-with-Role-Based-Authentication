import React from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";

function InvalidUser() {
  const navigate = useNavigate();
  const { login, auth, error } = useAuthContext();

  const loginHandler = () => {
    login(null);
    navigate("/login");
    console.log(auth);
  };

  return (
    <main>
      <p>{error} 🛑!</p>
      <button id="login-btn" onClick={loginHandler}>
        Go Back
      </button>
    </main>
  );
}

export default InvalidUser;
