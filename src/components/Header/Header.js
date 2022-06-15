import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();
  const { logout, auth } = useAuthContext();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src="../../../logo.png" />
        </NavLink>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="professors">Professors</NavLink>
          </li>
          <li>
            <NavLink to="hods">HODs</NavLink>
          </li>
          <li>
            <NavLink to="lecturers">Lecturers</NavLink>
          </li>
          <li>
            <NavLink to="students">Students</NavLink>
          </li>
          <li>
            <NavLink to="workers">Workers</NavLink>
          </li>
        </ul>
      </div>
      <div id="dropdown-btn">
        <p>Admin</p>
        <FontAwesomeIcon icon={faAngleUp} />
        <div id="dropdown-links">
          <NavLink to="manage-users">Manage users</NavLink>
          <NavLink to="manage-blogs">Manage Blogs</NavLink>
        </div>
      </div>
      {auth !== "loading" && auth && (
        <button onClick={logoutHandler} id="logout-link-btn">
          Logout
        </button>
      )}
      {!auth && (
        <button onClick={() => navigate("/login")} id="login-link-btn">
          Login
        </button>
      )}
      {!auth && (
        <button onClick={() => navigate("/register")} id="register-btn">
          Register
        </button>
      )}
    </header>
  );
}

export default Header;
