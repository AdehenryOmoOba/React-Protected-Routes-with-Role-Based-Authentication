import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./Users.css";
import Modal from "../Modal/Modal";

const FORM_STYLES = {
  height: "50%",
  width: "50%",
  backgroundColor: "yellow",
  flexDirection: "column",
};

const BUTTON_STYLES = {
  backgroundColor: "blueViolet",
  display: "grid",
  placeItems: "center",
  padding: "1rem 2rem",
  color: "#ffffff",
  borderRadius: "0.5rem",
  zIndex: 60,
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

    const username = document.querySelector(
      `[data-username="${usernameClicked}"] #left p:nth-child(1) span:nth-child(2)`
    ).textContent;

    const telephone = document.querySelector(
      `[data-username="${usernameClicked}"] #left p:nth-child(2) span:nth-child(2)`
    ).textContent;

    const role = document.querySelector(
      `[data-username="${usernameClicked}"] #right #role-div p`
    ).textContent;

    setUser(usernameClicked);
    setEditUsername(username);
    setEditTelephone(telephone);
    setEditRole(role);
    setIsOpen(true);
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
        <div id="user" data-username="adehenry">
          <div id="left">
            <p>
              <span>Username </span>
              <span className="user-info">adehenry</span> {/* USERNAME */}
            </p>
            <p>
              <span>Telephone </span>
              <span className="user-info">08030821679</span> {/* TELEPHONE */}
            </p>
          </div>
          <div id="right" className="flex">
            <div id="role-edit-delete" className="flex">
              <div className="flex" id="role-div">
                <p id="role">Professor</p> {/* ROLE */}
              </div>
              <div className="flex" id="edit-delete">
                <div id="edit" className="flex" onClick={handleEdit}>
                  <p>Edit</p>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <div id="delete" className="flex">
                  <p>Delete</p>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="user" data-username="kiddo">
          <div id="left">
            <p>
              <span>Username </span>
              <span className="user-info">kiddo</span> {/* USERNAME */}
            </p>
            <p>
              <span>Telephone </span>
              <span className="user-info">08060902211</span> {/* TELEPHONE */}
            </p>
          </div>
          <div id="right" className="flex">
            <div id="role-edit-delete" className="flex">
              <div className="flex" id="role-div">
                <p id="role">Doctor</p> {/* ROLE */}
              </div>
              <div className="flex" id="edit-delete">
                <div id="edit" className="flex" onClick={handleEdit}>
                  <p>Edit</p>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <div id="delete" className="flex">
                  <p>Delete</p>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
        <form style={FORM_STYLES} className="flex">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="telephone">Telephone:</label>
            <input
              type="text"
              id="telephone"
              value={editTelephone}
              onChange={(e) => setEditTelephone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            />
          </div>
          <button onClick={submitEditHandler} style={BUTTON_STYLES}>
            Submit
          </button>
        </form>
      </Modal>
    </main>
  );
}

export default Users;
