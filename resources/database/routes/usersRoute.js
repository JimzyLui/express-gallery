"use strict";
var express = require("express");
var User = require("../models/User");
var router = express.Router();

router.use("/", (req, res, next) => {
  console.log("Users Route");
  next();
});

router.get("/new", (req, res) => {
  console.log("launch input screen...");
  res.render("userNew", {
    mainHeading: "Remember Us!",
    pageTitle: "Add New User",
    hasBackgroundImage: true,
    backgroundImage: "./images/whitelilly.jpeg"
  });
});
router.post("/add", (req, res) => {
  new User({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
    .save()
    .then(function(saved) {
      res.json({ saved });
    });
});

router.put("/:id", (req, res) => {
  console.log("PUT: /:id");
  User.where("id", req.params.id)
    .fetch()
    .then(function(user) {
      user
        .save({
          nameFirst: req.body.nameFirst,
          nameLast: req.body.nameLast,
          username: req.body.username,
          email: req.body.email
        })
        .then(function(saved) {
          res.json({ saved });
        });
    });
});

router.delete("/:id", (req, res) => {
  console.log("DELETE: /:id");
  User.where("id", req.params.id)
    .destroy()
    .then(function(destroyed) {
      res.json({ destroyed });
    });
});

router.get("/edit/:id", (req, res) => {
  User.where({ id: req.params.id })
    .fetch()
    .then(function(users) {
      res.render("userEdit", {
        p: users.attributes,
        mainHeading: "Remember Us!",
        pageTitle: "Edit User"
      });
    });
});

router.get("/search", (req, res) => {
  User.where(req.query) // Add this one line
    .fetchAll()
    .then(function(users) {
      res.json({ users });
    });
});
router.get("/:id", (req, res) => {
  console.log("GET: /:id ", req.params.id);
  User.where({ id: req.params.id })
    .fetch()
    .then(function(users) {
      // res.json({ users });
      console.log(users);
      res.render("userDetails", {
        p: users.attributes,
        mainHeading: "Remember Us!",
        pageTitle: "User Details"
      });
    });
});

router.get("/", (req, res) => {
  console.log("GET: /");
  User.fetchAll().then(function(users) {
    // res.json({ users });
    console.log(users.models.length);
    res.render("users", {
      hasUsers: users.models.length > 0,
      recordsFound: users.models.length,
      users: users.models,
      mainHeading: "Remember Us!",
      pageTitle: "User List"
    });
  });
});

module.exports = router;
