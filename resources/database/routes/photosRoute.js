"use strict";
const express = require("express");
const Photo = require("../models/photo");
const router = express.Router();
const Authroute = require("./authRoute");
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/edit/:id", isAuthenticated, (req, res) => {
  res.render("edit", { mainHeading: "Edit Photo" });
});

router
  .route("/new")
  .get(isAuthenticated, (req, res) => {
    res.render("photoNew", { mainHeading: "Add New Photo" });
  })
  .post((req, res) => {
    res.send("posted!!!");
  });

router.get("/", isAuthenticated, (req, res) => {
  Photo.fetchAll().then(photos => {
    res.render("photos", { photos: photos.models });
  });
  // Photo.fetchAll().then(photos => {
  //   console.log(photos);
  //   res.render("photos", { photos }).catch(error => {
  //     console.log(error);
  //     res.send("An Error Occurred!");
  //   });
  // });
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    const msg = `Not authenticated!`;
    req.flash("Fail", msg);
    console.log(msg);
    res.redirect("/");
  }
}

module.exports = router;
