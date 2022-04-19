import React, { useEffect, useState } from "react";
import styles from "../../Styles/Components/Forms.module.css";
import useForm from "../../Hooks/UseForm";

export default function SignUpForm() {
  const [formData, updateForm] = useState({
    userName: "Enter a username",
    email: "Enter a username",
    mobile: "Enter mobile phone",
    userPass: "",
    confPass: "",
  });

  // declare state variables
  const { inputs, handleInputChange } = useForm();
  const [title, setTitle] = useState("SignUp Here!");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      var raw = JSON.stringify(inputs);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log(raw);
      fetch("http://127.0.0.1:5000/register", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response["message"]) {
            setTitle(response["message"]);
          }
          if (response["access_token"]) {
            sessionStorage.setItem("access_token", response["access_token"]);
            window.location.pathname = "/home";
          }
        })
        .catch((error) => console.log("Fetch error"));
      setSubmitted(false);
    }
  }, [submitted, inputs]);

  return (
    <div>
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <span className={styles.formTitle}>{title}</span>
        <div className={styles.inputField}>
          <input
            className="inputField"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={inputs.username || ""}
            required
          ></input>
        </div>
        <div className={styles.inputField}>
          <input
            className="inputField"
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
            value={inputs.email || ""}
            required
          ></input>
        </div>
        <div className={styles.inputField}>
          <input
            className="inputField"
            type="text"
            name="mobile"
            placeholder="Phone Number"
            onChange={handleInputChange}
            value={inputs.mobile || ""}
            required
          ></input>
          <script src="{{ url_for('static', filename='js/phone.js') }}"></script>
        </div>
        <div className={styles.inputField}>
          <input
            className="inputField"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={inputs.password || ""}
            required
          ></input>
        </div>
        <div className={styles.inputField}>
          <input
            className="inputField"
            type="password"
            name="confpass"
            id="confpass"
            placeholder="Confirm Password"
            required
          ></input>
        </div>
        <div className={styles.sbmtBtn}>
          <input
            type="submit"
            name="submit"
            className={styles.sbmtBtn}
            value="SIGN UP"
          ></input>
        </div>
        <br></br>
        <div className={styles.reference}>
          <p>
            Already a member? Log In{" "}
            <a href="/">
              <b>Here</b>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}