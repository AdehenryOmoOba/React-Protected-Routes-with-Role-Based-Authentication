require('./home.css')
import React, { useState } from "react";
import { useAuthContext } from "..//../Authorization/AuthProvider";
import {useQuery} from 'react-query'
import { axiosBase } from "../../Axios/axiosBase";
import { useNavigate } from "react-router-dom";



// const message = "God is good...all the time!!!"



function Home() {
  const {auth,setAuth} = useAuthContext()
  const [messageType, setMessageType ]= useState("")
  const [ message, setMessage] = useState("")
  const [querySwitch, setQuerySwitch] = useState(false)
  const navigate = useNavigate()

  const fetchMessage = async ({queryKey}) => {
    let response
    if (queryKey[1] === 'private'){
      response = await axiosBase.get('/messages/private',{
        // withCredentials: true,
        headers: {
          auhtorisation: `Bearer ${auth?.accessToken}`
        }
      } )
    }else{
      response = await axiosBase.get('/messages/public')
    }
    return response.data
  }
  const {isLoading,error} = useQuery(['messages', messageType], fetchMessage, {
    enabled: querySwitch,
    onSuccess: (data) => {
      setQuerySwitch(false)
      setMessage(data.message)
    },
    onError: (error) => {
      console.log(`scrrrrrrrrr`,error)
      if(error.response.status === 403) {
        setAuth(null)
        alert('Your current session has expired. Please login to continue')
        navigate('/login')
      }

    }
    
  })
  const user = auth?.username || 'Guest'
  const capitalisedUser = user[0].toUpperCase() + user.slice(1).toLowerCase()



  const publicMessageHandler = () => {
    setMessageType('public')
    setQuerySwitch(true)
  }
  const privateMessageHandler = () => {
    if (!auth) return alert('Please login to view private message')
    
    setMessageType('private')
    setQuerySwitch(true)
  }
 
  return (
    <main>
      <h2>Welcome to HOME Page, {capitalisedUser}! 👋</h2>
      <div id="message">
        <div id="top">
          <button onClick={publicMessageHandler}>View public message</button>
          <button onClick={privateMessageHandler}>View private message</button>
        </div>
        {message && <div id="bottom"><p><span>{messageType === 'public' ? "Public":"Private"}</span> : {message}</p></div>}
      </div>
    </main>
  );
}

export default Home;
