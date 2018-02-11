'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./install.controller');

router.get('/', controller.installDatabase);

module.exports = router;