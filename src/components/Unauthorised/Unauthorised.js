import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorised() {
  const navigate = useNavigate();
  return (
    <main>
      <p>You are unauthorised to view this page 🛑!</p>
      <button id="login-btn" onClick={() => navigate("/")}>
        Home
      </button>
    </main>
  );
}

export default Unauthorised;
