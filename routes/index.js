'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const { userController, seriesController } = require('../controllers');

const { userValidation } = require('../controllers/validation');

/** BEGIN ROUTES **/

// user routes
api.post('/login', userController.login);
api.post('/register', userValidation, userController.register);
// series routes
api.get('/series', seriesController.listSeries);
api.post('/series', seriesController.createSeries);

/** END ROUTES **/

module.exports = api;
