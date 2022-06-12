import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
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
    </main>
  );
}

export default Users;
