'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  title: { type: String, unique: true, lowercase: true, required: true },
  description: { type: String, lowercase: true, required: true },
  image: { type: String, required: true },
  category: { type: String, lowercase: true, required: true },
  capList: [{ type: Schema.Types.ObjectId, ref: 'Capitulos' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Series', SeriesSchema);
