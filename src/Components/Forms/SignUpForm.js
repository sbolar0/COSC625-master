import React, { useState } from 'react';
import useForm from './CustomHooks';

export default function SignUpForm() {
    const [formData, updateForm] = useState({
        userName: 'Enter a username',
        email: 'Enter a username',
        userPass: '',
        confPass: ''
    })

    const handleSubmit = () =>{

    }

    return (
        
        <div>
            <form className="loginForm" method="POST" action='#'>
                <span className="loginTitle">{{ title }}</span>
                <div className="inputContainer">
                    <input className="inputField" type="text" name="username" id="username" placeholder="Username" required></input>
                </div>
                <div className="inputContainer">
                    <input className="inputField" type="text" id="phone" name="phone" placeholder="Phone Number"></input>
                    <script src="{{ url_for('static', filename='js/phone.js') }}"></script>
                </div>
                <div className="inputContainer">
                    <input className="inputField" type="password" name="pass" id="pass" placeholder="Password" required></input>
                </div>
                <div className="inputContainer">
                    <input className="inputField" type="password" name="confpass" id="confpass" placeholder="Confirm Password" required></input>
                </div>
                <div className="inputContainer">
                    <input className="inputField" type="password" name="betacode" id="betacode" placeholder="Beta Test Code" required></input>
                </div>
                <div className="containerBtn">
                    <input type="submit" name="submit" className="loginBtn" value="SEND"></input>
                </div>
                <br></br>
                <div style="font-family:helvetica"><p>Already a member? Login <a href="{{ url_for('index') }}"><b>here</b></a></p></div>
            </form>
        </div>
    )
}
