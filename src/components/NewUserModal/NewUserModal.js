import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faUser } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../Spinner/Spinner";
import "../Modal/Modal.css";

const MODAL_STYLES = {
  position: "fixed",
  height: "100vh",
  width: "100vw",
  inset: "0rem",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  rowGap: "4rem",
  justifyContent: "center",
  alignItems: "center",
};

const BUTTON_STYLES = {
  backgroundColor: "blueViolet",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  columnGap: "1rem",
  padding: "1rem 2rem",
  color: "#ffffff",
  borderRadius: "0.5rem",
  zIndex: 60,
  marginTop: "2rem",
  width: "max-content",
};

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

function NewUserModal({ open, close, refreshData }) {
  const [newUsername, setNewUsername] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newRole, setNewRole] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerUser, { data }] = useMutation(REGISTER);

  const createUser = async (e) => {
    e.preventDefault();

    setLoading(true);
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const response = await registerUser({
        variables: {
          registerData: {
            username: newUsername,
            password,
            confirmPassword,
            phone: newTelephone,
            role: newRole,
          },
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
      }
      setRegisterSuccess("success: registration successful!");
      refreshData();

      setNewUsername("");
      setNewTelephone("");
      setNewRole("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleClose = () => {
    setRegisterError("");
    setRegisterSuccess("");
    close(false);
  };

  if (!open) return null;

  if (loading)
    return (
      <div style={MODAL_STYLES}>
        <div id="loading" className="flex">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div style={MODAL_STYLES}>
      {registerError && <p id="register-error">{registerError}</p>}
      {registerSuccess && <p id="register-success">{registerSuccess}</p>}

      <form id="content" className="flex">
        <div className="form-control flex">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="text"
            id="telephone"
            value={newTelephone}
            onChange={(e) => setNewTelephone(e.target.value)}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="role">Role:</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            id="role"
          >
            <option value="">Select user's role</option>
            <option value="professors">Professors</option>
            <option value="hods">HODs</option>
            <option value="lecturers">Lecturers</option>
            <option value="students">Students</option>
            <option value="workers">Workers</option>
          </select>
        </div>
        <button onClick={(e) => createUser(e)} style={BUTTON_STYLES}>
          Create User
          <FontAwesomeIcon icon={faUser} />
        </button>
      </form>
      <button id="modal-btn" onClick={() => handleClose()}>
        Close
        <FontAwesomeIcon icon={faCancel} />
      </button>
    </div>
  );
}

export default NewUserModal;
