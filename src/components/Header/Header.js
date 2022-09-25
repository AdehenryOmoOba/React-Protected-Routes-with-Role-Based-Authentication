import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";
import {useMutation} from 'react-query'

const logout = async () => {
  const logoutURL = `/logout`;
  const response = await axiosBase.post(logoutURL)
  return response.data
}

function Header() {
  const navigate = useNavigate();
  const { logout, auth ,setAuth} = useAuthContext();
  const {mutate,isLoading} = useMutation(logout,{
    onSuccess: (response) => {
      setAuth((prev) => null)
      navigate('/')
    },
    onError: (error) => console.log(error.response.data.error)
  })

  const logoutHandler = () => {
    mutate()
    // logout();
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <NavLink to="/">ADEHENRY.</NavLink>
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
            <NavLink to="students">Students</NavLink>
          </li>
        </ul>
       {!auth && <button onClick={() => navigate("/login")} id="login-link-btn">
          Login
        </button>}
      { !auth && <button onClick={() => navigate("/register")} id="register-btn">
          Register
        </button>}
      </div>
      {auth && 
        <button onClick={logoutHandler}  id="logout-link-btn">Logout</button>
      }
    </header>
  );
}

export default Header;
