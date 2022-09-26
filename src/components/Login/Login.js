import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useMutation} from 'react-query'
import { axiosBase } from "../../Axios/axiosBase";
import Loading from '../Loading/Loading'

const login = async (loginData) => {
  const loginURL = `/login`;
  const response = await axiosBase.post(loginURL, loginData)
  return response.data
}

function Login() {
  const usernameRef = useRef();
  const location = useLocation();
  const [loginInfo, setLoginInfo] = useState({username:"", password:""});
  const navigate = useNavigate();
  const {auth, setAuth} = useAuthContext()
  const {mutate,isLoading} = useMutation(login,{
    onSuccess: (response) => {
      setAuth(response)
      navigate('/')
    },
    onError: (error) => console.log(error.response.data.error)
  })
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const redirect = location.state?.path || "/";

  const loginHandler = () => {
    const { username, password } = loginInfo
    const loginData = {username,password}
    mutate(loginData)
   
  };

  const handleChange = (e) =>{
    setLoginInfo((previous) => {
        return {...previous, [e.target.name]: e.target.value}
    } )
  }

  return (
    <main>
      {isLoading && <Loading />}
      <p style={{textAlign:'center'}}>Login</p>
      <div className="formControl">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginInfo.username}
          ref={usernameRef}
          onChange={handleChange}
        />
      </div>
      <div className="formControl">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
        />
      </div>
      <div className="btnDiv">
        <button id="login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </main>
  );
}

export default Login;
