import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoMatch.css";

export const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <div className="noMatch">
      <p>Page Not Found 😵!</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};
