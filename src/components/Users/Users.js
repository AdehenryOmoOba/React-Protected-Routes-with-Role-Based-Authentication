import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./Users.css";

function Users() {
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
        <div id="user">
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
                <div id="edit" className="flex">
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
    </main>
  );
}

export default Users;
