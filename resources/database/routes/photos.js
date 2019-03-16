'use strict';
var express = require('express');
var Photo = require('../models/photo');
var router = express.Router();
router.route('/')
  .get(function(req, res) {
    User
      .fetchAll()
      .then(function(photos) {
        res.json({ photos });
      });
  });
module.exports = router;