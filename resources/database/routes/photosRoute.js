"use strict";
const express = require("express");
const Photo = require("../models/photo");
const router = express.Router();

router.get("/edit/:id", (req, res) => {
  res.render("edit", { mainHeading: "Edit Photo" });
});

router.get("/new", (req, res) => {
  res.render("photosNew", { mainHeading: "Add New Photo" });
});

router.get("/", (req, res) => {
  Photo.fetchAll().then(function(photos) {
    res.json({ photos });
  });
});

module.exports = router;
