"use strict";
var express = require('express');
var controller = require('./comment.controller');
var router = express.Router();
router.post('/:blogId', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
module.exports = router;
