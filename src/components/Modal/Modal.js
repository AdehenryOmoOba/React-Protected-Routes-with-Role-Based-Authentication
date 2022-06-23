import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCancel } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../Spinner/Spinner";
import useAllUsers from "../../apolloServer/dataRequestHooks/GetAllUsers";

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

const ALERT_STYLES = {
  width: "max-content",
  backgroundColor: "#29af29",
  color: "white",
  padding: "0.5rem 2rem",
  borderRadius: "5rem",
};

const EDIT_USER = gql`
  mutation update($username: String, $update: UserUpdateInput) {
    updateUser(username: $username, update: $update) {
      successResponse
      errorResponse
    }
  }
`;

function Modal({ open, close, user, username, phone, role, refreshData }) {
  const { refetch } = useAllUsers;
  const [editUsername, setEditUsername] = useState("");
  const [editTelephone, setEditTelephone] = useState("");
  const [editRole, setEditRole] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [update, { data }] = useMutation(EDIT_USER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditUsername(username);
    setEditTelephone(phone);
    setEditRole(role);
  }, [user]);

  const submitEditHandler = async (e) => {
    e.preventDefault();

    setUpdateSuccess("");
    setUpdateError("");

    setLoading(true);

    try {
      const response = await update({
        variables: {
          username: user,
          update: {
            username: editUsername,
            phone: editTelephone,
            phone: editTelephone,
            role: editRole,
          },
        },
      });

      setLoading(false);

      const {
        data: {
          updateUser: { errorResponse, successResponse },
        },
      } = response;

      if (errorResponse) {
        throw new Error(errorResponse);
      }

      setUpdateSuccess(`success: ${user} update successful!`);
      refreshData();
    } catch (error) {
      setUpdateError(error.message);
    }
  };

  const handleClose = () => {
    setUpdateSuccess("");
    setUpdateError("");

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
      <form id="content" className="flex">
        {updateSuccess && <p style={ALERT_STYLES}>{updateSuccess}</p>}
        {updateError && <p style={ALERT_STYLES}>{updateError}</p>}
        <div className="form-control flex">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={editUsername}
            onChange={(e) => {
              setEditUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="text"
            id="telephone"
            value={editTelephone}
            onChange={(e) => setEditTelephone(e.target.value)}
          />
        </div>
        <div className="form-control flex">
          <label htmlFor="role">Role:</label>
          <select
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
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
        <button onClick={(e) => submitEditHandler(e)} style={BUTTON_STYLES}>
          Save
          <FontAwesomeIcon icon={faSave} />
        </button>
      </form>
      <button id="modal-btn" onClick={() => handleClose()}>
        Close
        <FontAwesomeIcon icon={faCancel} />
      </button>
    </div>
  );
}

export default Modal;
