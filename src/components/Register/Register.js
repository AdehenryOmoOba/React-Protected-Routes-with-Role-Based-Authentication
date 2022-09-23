import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "../../Axios/axiosBase";
import {useMutation} from 'react-query'
import Loading from '../Loading/Loading'

const register = async (registerData) => {
   const usersURL = `/register`;
   const response = await axiosBase.post(usersURL, registerData)
   return response.data
}

function Register() {
  const [registerInfo, setRegisterInfo] = useState({username:"", password:"",confirmPassword:""});
  const usernameRef = useRef();
  const navigate = useNavigate()
  const {mutate,isLoading} = useMutation(register,{
    onSuccess: (response) => {
      console.log(response)
      navigate('/login')
    },
    onError: (error) => console.log(error.response.data.error)
  })
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const registerHandler = () => {
    const { username, password } = registerInfo
    const registerData = { username, password };
    console.log(registerData);
    mutate(registerData)
  };

  const handleChange = (e) =>{
    setRegisterInfo((previous) => {
        return {...previous, [e.target.name]: e.target.value}
    } )
  }

  return (
    <main>
       {isLoading ? <Loading />
       : <>
      <p>Register</p>
      <div className="formControl">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={registerInfo.username}
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
          value={registerInfo.password}
          onChange={handleChange}
        />
      </div>
      <div className="formControl">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          value={registerInfo.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="btnDiv">
        <button id="login-btn" onClick={registerHandler}>
          Register
        </button>
      </div>
      </>}
    </main>
  );
}

export default Register;
