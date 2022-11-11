'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const { userController } = require('../controllers');

/** BEGIN ROUTES **/

api.post('/login', userController.login);
api.post('/register', userController.register);

/** END ROUTES **/

module.exports = api;
