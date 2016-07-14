"use strict";
var express = require('express');
var controller = require('./local.controller');
var router = express.Router();
router.post('/register', controller.register);
module.exports = router;
