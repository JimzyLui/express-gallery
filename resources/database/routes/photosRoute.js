"use strict";
const express = require("express");
const Photo = require("../models/photo");
const router = express.Router();

router.get("/edit/:id", (req, res) => {
  res.render("edit", { mainHeading: "Edit Photo" });
});

router
  .route("/new")
  .get((req, res) => {
    res.render("photosNew", { mainHeading: "Add New Photo" });
  })
  .post((req, res) => {
    res.send("posted!!!");
  });

router.get("/", (req, res) => {
  Photo.fetchAll().then(photos => {
    console.log(photos);
    res.render("photos", { photos }).catch(error => {
      console.log(error);
      res.send("An Error Occurred!");
    });
  });
});

module.exports = router;
