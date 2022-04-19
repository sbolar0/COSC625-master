import React, {useEffect, useState} from 'react';
import styles from '../../Styles/Components/Forms.module.css'
import useForm from '../../Hooks/UseForm';


export default function LoginForm() {

  // declare state variables
  const {inputs, handleInputChange} = useForm()
  const [title,setTitle] = useState('Login Here!')
  const [submitted, setSubmitted] = useState(false)
    
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault()
      setSubmitted(true)
    }
  }

  useEffect(() => {
    if(submitted){
      var raw = JSON.stringify(inputs)
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } 
      fetch("http://127.0.0.1:5000/auth", requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response["message"]){ setTitle(response["message"])}
        if(response["access_token"]){
          sessionStorage.setItem("access_token", response["access_token"])
          window.location.pathname = "/home"
        }
      })
      .catch(error => console.log("Fetch error"))
      setSubmitted(false)
    }
  }, [submitted, inputs])

  return ( 
    <form className={styles.userForm} onSubmit={handleSubmit}>
      <span className={styles.formTitle}><b>{title}</b></span>
      <input
        className={styles.inputField}
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
        value={inputs.username || ""}
        required
      ></input>
      <input
        className={styles.inputField}
        type="password"
        name="password"
        id="userPass"
        placeholder="Password"
        onChange={handleInputChange}
        value={inputs.password || ""}
        required
      ></input>
      <div className={styles.containerBtn}>
        <input type="submit" name="submit" className={styles.sbmtBtn} value="LOGIN"></input>
      </div>
      <br></br>
      <div className={styles.reference}><p>Not a member? Sign Up <a href="/signup"><b>Here</b></a></p></div>
    </form>


  )
}

