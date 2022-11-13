'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  title: { type: String, unique: true, lowercase: true, required: true },
  description: { type: String, lowercase: true, required: true },
  image: { type: String, unique: true, required: true },
  category: { type: String, lowercase: true, required: true },
  //TODO: hacer listado Id capitulos, series favoritas
});

module.exports = mongoose.model('Series', SeriesSchema);
