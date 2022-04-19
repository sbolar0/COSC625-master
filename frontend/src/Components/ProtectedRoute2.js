import React, {useEffect, useState} from 'react'
import { Redirect, Route } from "react-router-dom"

export default function ProtectedRoute({ component: Component, ...restProps}) {
    const [authenticated, setAuth] = useState(false) 

    useEffect(()=>{
        var bearer_token =  sessionStorage.getItem("access_token")
        var bearer = 'Bearer ' + bearer_token;
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", bearer)
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            withCredentials: true,
            credentials: 'include',
        } 
        fetch("http://127.0.0.1:5000/token", requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response["message"] === "success"){ 
                setAuth(true)
            }
        })
        .catch(error => console.log("Fetch error"))
    }, [])

    if(authenticated){
        return (<Route/>)
    }
    
    else{
        return ("<div>404<div/>")
    }
}
