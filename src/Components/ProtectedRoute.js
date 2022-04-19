import React, { useState } from 'react'
import {
    Route,
    Navigate,
    useLocation,
  } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth';
import Loading from './Loading';


const ProtectedRoute = ({ children}) => {
    const location = useLocation();
    const [isLoading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)

    if(!sessionStorage.getItem("access_token")){
      window.location.pathname = "/"
    }
  
    if(sessionStorage.getItem("access_token")){
      var bearer_token =  sessionStorage.getItem("access_token")
      var bearer = 'Bearer ' + bearer_token;
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", bearer)
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          withCredentials: true
      } 
      fetch("http://127.0.0.1:5000/token", requestOptions)
      .then(r =>  r.json().then(data => ({status: r.status, body: data})))
      .then(obj =>{
        if(obj.status === 200 && obj.body["message"] === "success" ){
            setAuth(true)
            return(children)
            console.log("Success")
        }
        else{
            setAuth(false) 
            window.location.pathname = "/"
        }
      })

}
    return isAuth ? children : <Loading/> 
    //return children
}

export default ProtectedRoute;
