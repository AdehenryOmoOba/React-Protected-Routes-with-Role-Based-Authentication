import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";

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
        <NavLink to="/">LOGO</NavLink>
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
      {auth !== "loading" && auth && (
        <button onClick={logoutHandler}>Logout</button>
      )}
    </header>
  );
}

export default Header;
