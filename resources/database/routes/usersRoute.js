'use strict';
var express = require('express');
var User = require('../models/user');
var router = express.Router();
router.route('/')
  .get(function(req, res) {
    User
      .fetchAll()
      .then(function(users) {
        res.json({ users });
      });
  });
module.exports = router;