"use strict";
var express = require("express");
var User = require("../models/user");
var router = express.Router();

router.post("/add", (req, res) => {
  new User({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    username: req.body.username,
    email: req.body.email
  })
    .save()
    .then(function(saved) {
      res.json({ saved });
    });
});

router.put("/:id", (req, res) => {
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
  User.where("id", req.params.id)
    .destroy()
    .then(function(destroyed) {
      res.json({ destroyed });
    });
});

router.get("/edit/:id", (req, res) => {
  res.render("edit", { mainHeading: "Edit User" });
});

router.get("/search", (req, res) => {
  User.where(req.query) // Add this one line
    .fetchAll()
    .then(function(users) {
      res.json({ users });
    });
});
router.get("/:id", (req, res) => {
  User.where({ id: req.params.id })
    .fetch()
    .then(function(users) {
      res.json({ users });
    });
});
router.get("/", (req, res) => {
  User.fetchAll().then(function(users) {
    res.json({ users });
  });
});

module.exports = router;
