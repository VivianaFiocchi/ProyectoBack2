'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const { userController, seriesController } = require('../controllers');

const { userValidation } = require('../controllers/validation');
const { seriesService } = require('../service');

/** BEGIN ROUTES **/

// user routes
api.post('/login', userController.login);
api.post('/register', userValidation, userController.register);
// series routes
api.get('/series', seriesController.listSeries);
api.post('/series', seriesController.createSeries);
api.patch('/series/:id', seriesController.updateSeries)
api.delete('/series/:id', seriesController.deleteSeries)


/** END ROUTES **/

module.exports = api;
