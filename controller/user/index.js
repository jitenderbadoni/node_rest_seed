'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/registration', controller.userRegistration);

module.exports = router;