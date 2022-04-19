import React, { useState, useContext, createContext } from 'react';




export default function useAuth() {
  const authContext = createContext()
  const [authed, setAuthed] = useState(false);

  const login = async (inputs) => {
    var raw = JSON.stringify(inputs)
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    } 
    const response = await fetch("http://127.0.0.1:5000/", requestOptions)
    const data = await response.json()
    if(data["message"]){ return response["message"]}
    if(data["access_token"]){
      sessionStorage.setItem("access_token", data["access_token"])
      setAuthed(true)
      window.location.pathname = "/home"
    }
  }

}