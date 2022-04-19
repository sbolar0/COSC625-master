"use strict"

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql");
//const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require('express-jwt');
const saltRounds = 10;
const cors = require("cors");
const { send } = require("express/lib/response");
const debug = false

// Database
const connection = mysql.createConnection({
  host: "wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "l5f8aa070e1nm5x4",
  password: "",
  database: "k6agffdomukm8bg6",
});
connection.connect();


// Server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  jwt({ 
    secret: 'supersecretkey', 
    algorithms: ['HS256']
  }).unless({
    path: [
      '/token',
      '/auth',
      '/register',
      '/home'
    ]
  })
);

// custom app functionality
app.use(function (err,req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } 
  if(debug){
    let msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = "";
    if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
    if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  } 
  next();
});
 

// http://localhost:5000/auth - login
app.post("/auth", function (req, res) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      async function (error, results) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if(results[0]){
          const comparison = await bcrypt.compare(password, results[0].password);
          if (comparison) {
            res.json({success:'success'})
            //res.redirect("/home");
          } else {
            res.json({message:"Incorrect Username and/or Password!"});
          }
        }else{
          res.json({message:'User Does Not Exist'});
        }
        res.end();
      }
    );
  } else {
    res.json({message:"Please enter Username and Password!"});
    res.end();
  }
});

// http://localhost:5000/logout
app.get("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send("Unable to log out");
    } else {
      res.send("Logout successful");
    }
  });
});

// http://localhost:5000/home
app.get("/home", function (req, res) {
  // If the user is loggedin
  if (req.session.loggedin) {
    // Output username
    res.send("Welcome back, " + req.session.username + "!"); // Update to forward to User page
  } else {
    // Not logged in
    res.send("Please login to view this page!");
  }
  res.end();
});

// http://localhost:5000/user
app.post("/user", function (req, res) {
  let username = req.body.username;
  //const username = "test3";
  console.log("name " + username);
  connection.query(
    "SELECT * FROM user WHERE username = ? ",
    [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        let users = {
          user_id: results[0].user_id,
          first_name: results[0].first_name,
          last_name: results[0].last_name,
          email: results[0].email,
          mobile: results[0].mobile,
        };
        console.log(users);
        res.send(users);
      } else {
        res.send("User not found!");
      }
      res.end();
    }
  );
});

//Check if a username already exists in the DB
app.get("/username", function (req, res) {
  let username = req.body.username;

  connection.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

//all users
app.get("/users", function (req, res) {
  //let username = req.body.username;
  // const users = [];
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result[0]);
    }
  });
});

// Add a User to DB
app.post("/register", async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  console.log("password " + password);
  let users = {
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
    mobile: req.body.mobile,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: "GU",
  };
  connection.query(
    "INSERT INTO user SET ?",
    users,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        res.send({
          code: 200,
          success: "User Registered Sucessfully",
        });
      }
    }
  );
});


// To Do => User Functions
// Delete a User in DB - Separate admin.js server?

// Update a User in DB

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
