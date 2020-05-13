"use strict";

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.redirect("books/?page=1&limit=5");
});
module.exports = router;