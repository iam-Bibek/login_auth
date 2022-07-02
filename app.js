//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema =new mongoose.Schema ({
  email: String,
  password: String,
});

// encryption of user data usin hash



const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

// save data through register

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });
  newUser.save(function (err) {
    if (!err) {
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

// validation inlogin page
app.post("/login", function (req, res) {
  const Username = req.body.username;
  const Password = md5(req.body.password);

  User.findOne=({ email: Username }, function(err , foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (!err) {
          if (foundUser.password === Password) {
            res.render("secrets");
          }
        }
      }
    });
});

app.listen(3000, function () {
  console.log("register app sterted at port 3000");
});
