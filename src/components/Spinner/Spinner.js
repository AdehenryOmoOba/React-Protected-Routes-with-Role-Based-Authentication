import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Spinner.css";

const SPINNER_STYLE = {
  textAlign: "center",
  fontSize: "3.2rem",
  width: "100vw",
  marginTop: "5rem",
};

export default function Spinner() {
  return (
    <FontAwesomeIcon
      style={SPINNER_STYLE}
      icon={faSpinner}
      className="spinner"
    />
  );
}
