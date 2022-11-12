'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const { userController } = require('../controllers');

const { userValidation } = require("../controllers/validation");

/** BEGIN ROUTES **/

api.post('/login', userValidation , userController.login);
api.post('/register', userValidation, userController.register);

/** END ROUTES **/

module.exports = api;
