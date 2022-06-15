import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrashCan,
  faSave,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import "./Users.css";
import "../Modal/Modal.css";

import Modal from "../Modal/Modal";

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

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editTelephone, setEditTelephone] = useState("");
  const [editRole, setEditRole] = useState("");

  const handleEdit = (e) => {
    const usernameClicked =
      e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-username"
      );

    if (!usernameClicked) return;

    const username = document.querySelector(
      `[data-username="${usernameClicked}"] .left p:nth-child(1) span:nth-child(2)`
    ).textContent;

    const telephone = document.querySelector(
      `[data-username="${usernameClicked}"] .left p:nth-child(2) span:nth-child(2)`
    ).textContent;

    const role = document.querySelector(
      `[data-username="${usernameClicked}"] .right .role-div p`
    ).textContent;

    setUser(usernameClicked);
    setEditUsername(username);
    setEditTelephone(telephone);
    setEditRole(role);
    setIsOpen(true);
  };

  const handleDelete = () => {
    alert(`Are you sure you want to delete user ${user} ?`);
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    console.log({
      user,
      username: editUsername,
      phone: editTelephone,
      role: editRole,
    });
  };

  return (
    <main id="users-page">
      <div id="add-user-btn" className="flex">
        <button>Create user</button>
        <div className="flex">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div id="filter-search" className="flex">
        <div id="filter" className="flex">
          <p className="flex">Filters</p>
          <div>
            <button>Professors</button>
            <button>HODs</button>
            <button>Lecturers</button>
            <button>Students</button>
            <button>Workers</button>
          </div>
        </div>
        <div id="search" className="flex">
          <form className="flex">
            <input type="text" placeholder="Search user..." />
            <button className="flex">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
      <div id="users-container" className="flex">
        <div className="user" data-username="adehenry">
          <div className="left">
            <p>
              <span>Username </span>
              <span className="user-info">adehenry</span> {/* USERNAME */}
            </p>
            <p>
              <span>Telephone </span>
              <span className="user-info">08030821679</span> {/* TELEPHONE */}
            </p>
          </div>
          <div className="right flex">
            <div className="role-edit-delete flex">
              <div className="role-div flex">
                <p className="role">Professor</p> {/* ROLE */}
              </div>
              <div className="edit-delete flex">
                <div className="edit flex" onClick={handleEdit}>
                  <p>Edit</p>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <div className="delete flex" onClick={handleDelete}>
                  <p>Delete</p>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isOpen}>
        <form id="content" className="flex">
          <div className="form-control flex">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
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
            <input
              type="text"
              id="role"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            />
          </div>
          <button onClick={submitEditHandler} style={BUTTON_STYLES}>
            Save
            <FontAwesomeIcon icon={faSave} />
          </button>
        </form>
        <button id="modal-btn" onClick={() => setIsOpen(false)}>
          Cancel
          <FontAwesomeIcon icon={faCancel} />
        </button>
      </Modal>
    </main>
  );
}

export default Users;
