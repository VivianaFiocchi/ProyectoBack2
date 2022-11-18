'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const {
  userController,
  seriesController,
  episodeController,
} = require('../controllers');

const { userValidation } = require('../controllers/validation');

/** BEGIN ROUTES **/

// user routes
api.post('/login', userController.login);
api.post('/register', userValidation, userController.register);
// series routes
api.get('/series', seriesController.listSeries);
api.get('/series/:id', seriesController.detailSeries);
api.post('/series', seriesController.createSeries);
api.patch('/series/:id', seriesController.updateSeries);
api.delete('/series/:id', seriesController.deleteSeries);
// episodes routes
api.get('/:title', episodeController.listEpisodes);
api.get('/:title/:episodeId', episodeController.oneEpisode);
api.post('/episodes', episodeController.createEpisode);
api.patch('/episodes/:id', episodeController.updateEpisode);
api.delete('/episodes/:id', episodeController.deleteEpisode);

/** END ROUTES **/

module.exports = api;
