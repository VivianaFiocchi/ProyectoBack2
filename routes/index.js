'use strict';

const express = require('express');
const api = express.Router();

/* Controllers */
const {
  userController,
  seriesController,
  episodeController,
} = require('../controllers');

/* Middlewares */
const {
  userValidation,
  seriesValidation,
  episodesValidation,
  favoriteValidation,
} = require('../middlewares');

/** BEGIN ROUTES **/

// User routes
api.post('/login', userController.login);
api.post('/register', userValidation, userController.register);
api.patch('/users/:email', favoriteValidation, userController.favorites);
api.get('/users/:email', userController.listFavorites);

// Series routes
api.get('/series', seriesController.listSeries);
api.get('/series/:id', seriesController.detailSeries);
api.post('/series', seriesValidation, seriesController.createSeries);
api.patch('/series/:id', seriesController.updateSeries);
api.delete('/series/:id', seriesController.deleteSeries);

// Episodes routes
api.get('/:title', episodeController.listEpisodes);
api.get('/:title/:episodeId', episodeController.oneEpisode);
api.post('/episodes', episodesValidation, episodeController.createEpisode);
api.patch('/episodes/:id', episodeController.updateEpisode);
api.delete('/episodes/:id', episodeController.deleteEpisode);

/** END ROUTES **/

module.exports = api;
