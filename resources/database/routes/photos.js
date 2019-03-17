"use strict";
var express = require("express");
var Photo = require("../models/photo");
var router = express.Router();
router.route("/").get(function(req, res) {
  // res.render("photos");
  Photo.fetchAll().then(function(photos) {
    res.json("photos", { photos, title: "Gallery" });
  });
});
router.route("/edit").get(function(req, res) {
  res.render("edit");
});
module.exports = router;
